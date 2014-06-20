courseManage = {
    init: function(){
        CMS.mainPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'anchor',
            items: [this.createForm(), this.createGrid()]
        });
    },

    createGrid: function(){
        var cm = [{
            text: '课程代号',
            dataIndex: 'number'
        }, {
            text: '课程名称',
            dataIndex: 'name'
        }, {
            text: '任课教师',
            dataIndex: 'teacher'
        }, {
            text: '选课人数',
            dataIndex: 'quantity'
        }, {
            text: '要求使用多媒体设备',
            dataIndex: 'multimedia'
        }, {
            text: '备注',
            dataIndex: 'remark'
        }];

        var gridTbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '删除',
                scope: this,
                iconCls: Wando.icons.deletes,
                handler: function(){
                    Wando.msg.confirm('确定', "确定要删除？", function(btn){ 
                        if(btn=='ok'){ 
                            this.deleteCourse();
                        }   
                    }, this)
                }
            }]
        });

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['id', 'number', 'name', 'teacher', 'quantity', 'multimedia', 'remark'],
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
            anchor: '100% 75%',
            columns: cm,
            store: store,
            id: 'courseGrid',
            tbar: gridTbar,
            forceFit: true,
            title: '课程列表'
        });
    },

    createForm: function(){
        var formTbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '添加',
                scope: this,
                iconCls: Wando.icons.add,
                handler: function(){
                    var form = Ext.getCmp('courseForm').getForm();
                    if(form.isValid()){
                        this.addCourse();
                    }else{
                        Wando.msg.warning('警告', '请输入完整、正确的数据类型的数据');
                    }

                }
            }]
        });
        return Ext.create('Ext.form.Panel', {
            anchor: '100% 25%',
            title: '课程信息',
            frame: true,
            id: 'courseForm',
            bodyPadding: 30,
            tbar: formTbar,
            items: [this.createFormItem()]
        })
    },

    createTStore: function(){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['id', 'name'],
            proxy: {
                type: 'ajax',
                url: '/managements/get_teacher_info.json',
                reader: {
                    type: 'json',
                    root: 'result'
                }
            }
        });
    },

    createMMStore: function(){
        return Ext.create('Ext.data.Store', {
            fields: ['value', 'display'],
            data: [{ value: 'true', display: '是' }, { value: 'false', display: '否' }]
        })
    },

    createFormItem: function(){
        return {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                columnWidth: .16,
                xtype: 'textfield',
                labelAlign: 'right',
            },
            items: [{
                fieldLabel: '课程代号',
                name: 'number',
                allowBlank: false
            }, {
                fieldLabel: '课程名称',
                name: 'name',
                allowBlank: false
            }, {
                fieldLabel: '任课老师',
                name: 'teacher_id',
                allowBlank: false,
                xtype: 'combo',
                valueField: 'id',
                displayField: 'name',
                store: this.createTStore()
            }, {
                fieldLabel: '选课人数',
                xtype: 'numberfield',
                minValue: 0,
                name: 'quantity'
            }, {
                fieldLabel: '多媒体设备',
                name: 'multimedia',
                xtype: 'combo',
                displayField: 'display',
                valueField: 'value',
                store: this.createMMStore()
            }, {
                fieldLabel: '备注',
                name: 'remark',
                xtype: 'textarea'
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
                Wando.msg.info('提示', "创建成功");
                Ext.getCmp('courseForm').getForm().reset();
                Ext.getCmp('courseGrid').store.reload();
            },
            failure: function(){
                Wando.msg.error('提示', "创建失败");
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
                Wando.msg.info('提示', "删除成功");
                grid.store.remove(sel);
            },
            failure: function(){
                Wando.msg.error('提示', "删除失败");
            }
        })
    }

}
