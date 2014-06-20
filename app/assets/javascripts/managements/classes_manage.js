classesManage = {
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
            text: '地址',
            dataIndex: 'address'
        }, {
            text: '最大容量',
            dataIndex: 'contain'
        }, {
            text: '多媒体设备',
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
                    Ext.Msg.confirm('提示', "确定要删除？", function(btn){
                        if(btn=='yes'){
                            this.deleteClass();
                        }
                    }, this);
                }
            }]
        });

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['id', 'address', 'number', 'contain', 'multimedia', 'remark'],
            proxy: {
                type: 'ajax',
                url: '/managements/get_classes_for_grid.json',
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
            id: 'classGrid',
            autoScroll: true,
            tbar: gridTbar,
            forceFit: true,
            title: '教室列表'
        });
    },

    createForm: function(){
        var formTbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '添加',
                scope: this,
                iconCls: Wando.icons.add,
                handler: function(){
                    var form = Ext.getCmp('classForm').getForm();
                    if(form.isValid()){
                        this.newClass();
                    }else{
                        Wando.msg.warning('警告', "请输入完整、正确类型的信息");
                    }
                }
            }]
        });
        return Ext.create('Ext.form.Panel', {
            anchor: '100% 25%',
            title: '教室信息',
            frame: true,
            id: 'classForm',
            bodyPadding: 30,
            tbar: formTbar,
            items: [this.createFormItem()]
        })
    },

    createFormStore: function(){
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
                columnWidth: .2,
                xtype: 'textfield',
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: '教室编号',
                name: 'number',
                allowBlank: false,
            }, {
                fieldLabel: '最大容量',
                name: 'contain',
                xtype: 'numberfield',
                minValue: 0,
                allowBlank: false,
            }, {
                fieldLabel: '地址',
                name: 'address'
            }, {
                fieldLabel: '多媒体设备',
                name: 'multimedia',
                allowBlank: false,
                xtype: 'combo',
                store: this.createFormStore(),
                valueField: 'value',
                displayField: 'display'
            }, {
                fieldLabel: '备注',
                xtype: 'textarea',
                name: 'remark'
            }]
        }
    },

    newClass: function(){
        var classInfo = Ext.getCmp('classForm').getValues();
        Ext.Ajax.request({
            url: '/managements/add_class_info.json',
            method: 'post',
            jsonData: { class_info: classInfo },
            success: function(){
                Wando.msg.info('提示', "添加成功");
                Ext.getCmp('classGrid').store.reload();
                Ext.getCmp('classForm').getForm().reset();
            },
            failure: function(){
                Wando.msg.error('提示', "添加失败");
            }
        })
    },

    deleteClass: function(){
        var grid = Ext.getCmp('classGrid');
        var sel = grid.getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            url: '/managements/delete_class.json',
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
