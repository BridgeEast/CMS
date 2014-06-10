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
            text: '课程名称',
            dataIndex: 'name'
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
                iconCls: Wando.icons.deletes,
                handler: function(){
                    this.deleteCourse();
                }
            }]
        });

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['id', 'number', 'name', 'time', 'teacher', 'quantity', 'multimedia'],
            proxy: {
                type: 'ajax',
                url: '/managements/get_class_table_for_grid.json',
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
            id: 'tableGrid',
            tbar: gridTbar,
            forceFit: true,
            title: '课程安排记录'
        });
    },

    createForm: function(){
        var formTbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '添加',
                scope: this,
                iconCls: Wando.icons.add,
                handler: function(){
                    var form = Ext.getCmp('tableForm').getForm();
                    if(form.isValid()){
                        this.addTable();
                    }else{
                        Ext.Msg.alert('警告', '请把数据填写完整');
                    }
                }
            }]
        });
        return Ext.create('Ext.form.Panel', {
            anchor: '100% 25%',
            title: '课表信息',
            frame: true,
            id: 'tableForm',
            bodyPadding: 30,
            tbar: formTbar,
            items: [this.createFormItem()]
        })
    },

    createClass: function(){
        return Ext.create('Ext.data.Store', {
            fields: ['id', 'number'],
            proxy: {
                type: 'ajax',
                url: '/managements/get_classes_for_grid.json',
                reader: {
                    type: 'json',
                    root: 'result'
                }
            }
        });
    },

    createCourse: function(){
        return Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            proxy: {
                type: 'ajax',
                url: '/managements/get_course_for_grid.json',
                reader: {
                    type: 'json',
                    root: 'result'
                }
            }
        });
    },

    createWeek: function(){
        return Ext.create('Ext.data.Store', {
            fields: ['week'],
            data: [{week: '1' }, { week: '2' },
                  { week: '3' }, { week: '4' },
                  { week: '5' }, { week: '6' },
                  { week: '7' }, { week: '8' },
                  { week: '9' }, { week: '10' },
                  { week: '11' }, { week: '12' },
                  { week: '13' }, { week: '14' },
                  { week: '15' }, { week: '16' },
                  { week: '17' }, { week: '18' }]
        });
    },

    createDate: function(){
        return Ext.create('Ext.data.Store', {
            fields: ['date'],
            data: [{ date: '星期一' }, { date: '星期二' }, { date: '星期三' }, { date: '星期四' }, { date: '星期五' }, { date: '星期六' }, { date: '星期日' }]
        });
    },

    createHour: function(){
        var store = Ext.create('Ext.data.Store', {
            fields: ['hour'],
            data: [{ hour:'1' }, { hour:'2' }, { hour:'3' }, { hour:'4' }, { hour:'5' }, { hour:'6' }, { hour:'7' }, { hour:'8' }, { hour:'9' }, { hour:'10'}]
        });
        var grid = Ext.create('Ext.grid.Panel', {
            id: 'hourGrid',
            columns: [{
                text: '节次',
                dataIndex: 'hour'
            }],
            store: store,
            forceFit: true,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
        });
        var tbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '确定',
                iconCls: Wando.icons.check,
                scope: this,
                handler: function(){
                    this.selectHour();
                }
            }]
        });
        return Ext.create('Ext.window.Window', {
            title: '选择节次',
            id: 'hourWin',
            height: 200,
            width: 200,
            layout: 'fit',
            animateTarget: 'hour',
            items: [grid],
            tbar: tbar
        });
    },

    selectHour: function(){
        var sel = Ext.getCmp('hourGrid').getSelectionModel().getSelection();
        var sels = '';
        sel.forEach(function(fn){
           sels += fn.data.hour.toString() + ' ';
        });
        Ext.getCmp('hour').setValue(sels);
        Ext.getCmp('hourWin').close();
    },

    createFormItem: function(){
        return {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                columnWidth: .16,
                xtype: 'combo',
                labelAlign: 'right',
                allowBlank: false
            },
            items: [{
                fieldLabel: '教室编号',
                name: 'class_info_id',
                displayField: 'number',
                valueField: 'id',
                name: 'class_info_id',
                store: this.createClass()
            }, {
                fieldLabel: '课程名称',
                name: 'course_id',
                displayField: 'name',
                valueField: 'id',
                store: this.createCourse()
            }, {
                fieldLabel: '起始周',
                name: 'week_s',
                displayField: 'week',
                valueField: 'week',
                store: this.createWeek()
            }, {
                fieldLabel: '结束周',
                displayField: 'week',
                valueField: 'week',
                name: 'week_e',
                store: this.createWeek()
            }, {
                fieldLabel: '星期',
                displayField: 'date',
                valueField: 'date',
                allowBlank: false,
                name: 'date',
                store: this.createDate()
            }, {
                fieldLabel: '节次',
                xtype: 'textfield',
                id: 'hour',
                name: 'hour',
                emptyText: "请选择",
                    listeners: {
                    scope: this,
                    focus: function(){ this.createHour().show() }
                }
            }]
        }
    },

    addTable: function(){
        var value = Ext.getCmp('tableForm').getForm().getValues();
        Ext.Ajax.request({
            url: '/managements/create_class_table.json',
            method: 'post',
            jsonData: {
                table: value
            },
            success: function(){
                Ext.Msg.alert('提示', "创建成功");
                Ext.getCmp('tableForm').getForm().reset();
                Ext.getCmp('tableGrid').store.reload();
            },
            failure: function(){
                Ext.Msg.alert('提示', "创建失败");
            }
        })
    },

    deleteCourse: function(){
        var grid = Ext.getCmp('tableGrid');
        var sel = grid.getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            url: '/managements/delete_class_table.json',
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
