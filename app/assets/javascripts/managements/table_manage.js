tableManage = { 
    init: function(){ 
        CMS.mainPanel = Ext.create('Ext.panel.Panel', { 
            region: 'center',
            layout: 'anchor',
            items: [this.createForm(), this.createGrid()]
        });
    },
    
    createGrid: function(){ 
        var cm = [{ 
            text: '教室编号',
            dataIndex: 'number'
        }, { 
            text: '上课时间',
            dataIndex: 'time'
        }, { 
            text: '任课教师',
            dataIndex: 'teacher'
        }, { 
            text: '选课人数',
            dataIndex: 'quantity'
        }, { 
            text: '多媒体设备',
            dataIndex: 'multimedia'
        }];

        var gridTbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{ 
                text: '删除',
                scope: this,
                handler: function(){ 
                    this.deleteCourse();
                }
            }]
        });

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['id', 'number', 'time', 'teacher', 'quantity', 'multimedia'],
            proxy: {
                type: 'ajax',
                url: '/managements/get_course_for_grid.json',
                reader: {
                    type: 'json',
                    root: 'result'
                }
            }
        });

        return Ext.create('Ext.grid.Panel', { 
            anchor: '100% 65%',
            columns: cm,
            store: store,
            id: 'courseGrid',
            tbar: gridTbar,
            forceFit: true,
            title: '课表'
        });
    },

    createForm: function(){ 
        var formTbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{ 
                text: '添加',
                scope: this,
                handler: function(){ 
                    var form = Ext.getCmp('courseForm').getForm();
                    if(form.isValid()){ 
                        this.addCourse();
                    }else{ 
                        Ext.Msg.alert('警告', '请把数据填写完整');
                    }
                    
                }
            }]
        });
        return Ext.create('Ext.form.Panel', { 
            anchor: '100% 35%',
            title: '课表信息',
            frame: true,
            id: 'courseForm',
            tbar: formTbar,
            items: [this.createFormItem()]
        })
    },

    createFormItem: function(){ 
        return { 
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: { 
                columnWidth: .25,
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false
            },
            items: [{ 
                fieldLabel: '教室编号',
                name: 'time'
            }, { 
                fieldLabel: '课程名称',
                name: 'teacher_id'
            }, { 
                fieldLabel: '教室编号',
                name: 'quantity'
            }, { 
                fieldLabel: '上课时间'
            }]
        }
    },

    addCourse: function(){ 
        var value = Ext.getCmp('courseForm').getForm().getValues();
        Ext.Ajax.request({ 
            url: '/managements/create_course.json',
            method: 'post',
            jsonData: { 
                course: value
            },
            success: function(){ 
                Ext.Msg.alert('提示', "创建成功");
                Ext.getCmp('courseForm').getForm().reset();
                Ext.getCmp('courseGrid').store.reload();
            },
            failure: function(){ 
                Ext.Msg.alert('提示', "创建失败");
            }
        })
    },

    deleteCourse: function(){ 
        var grid = Ext.getCmp('courseGrid');
        var sel = grid.getSelectionModel().getSelection()[0];
        Ext.Ajax.request({ 
            url: '/managements/delete_course.json',
            method: 'post',
            jsonData: { 
                id: sel.data.id
            },
            success: function(){ 
                Ext.Msg.alert('提示', "删除成功");
                grid.store.remove(sel);
            },
            failure: function(){ 
                Ext.Msg.alert('提示', "删除失败");
            }
        })
    }
    
}




