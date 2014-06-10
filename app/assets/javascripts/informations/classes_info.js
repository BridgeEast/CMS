classesInfo = {
    init: function(){
        CMS.mainPanel=Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'anchor',
            items: [this.createForm(), this.createGrid()]
        });
    },

    createForm: function(){
        var tbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '查询',
                iconCls: Wando.icons.query,
                scope: this,
                handler: function(){
                    this.queryClassInfo();
                }
            }]
        });

        var items = [{
            fieldLabel: '位置',
            name: 'address'
        }, {
            fieldLabel: '最大容量',
            name: 'contain'
        }, {
            fieldLabel: '多媒体设备',
            name: 'multimedia',
            xtype: 'combo',
            store: this.createFormStore(),
            valueField: 'value',
            displayField: 'display'
        }, {
            fieldLabel: '起始周',
            name: 'week_s'
        }, {
            fieldLabel: '结束周',
            name: 'week_e'
        }, {
            fieldLabel: '星期',
            name: 'date'
        }, {
            fieldLabel: '节次',
            name: 'hour'
        }]

        return Ext.create('Ext.form.Panel', {
            anchor: '100% 30%',
            tbar: tbar,
            frame: true,
            id: 'class_info',
            layout: 'column',
            bodyPadding: '50',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                columnWidth: .14
            },
            items: items
        })
    },

    createFormStore: function(){
        return Ext.create('Ext.data.Store', {
            fields: ['value', 'display'],
            data: [{ value: 'true', display: '是' }, { value: 'false', display: '否' }]
        })
    },

    queryClassInfo: function(){ 
        var sel = Ext.getCmp('class_info').getForm().getValues();
        Ext.getCmp('class_info_grid').store.load({ params: sel });
    },

    createGrid: function(){
        var cm = [{
            text: '教室编号',
            dataIndex: 'number'
        }, {
            text: '位置',
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

        var store = Ext.create('Ext.data.Store', { 
            fields: ['id', 'number', 'address', 'contain', 'multimedia','remark'],
            proxy: { 
                url: '/informations/query_class_info.json',
                type: 'ajax',
                reader: { 
                    type: 'json',
                    root: 'result'
                }
            }
        });

        return Ext.create('Ext.grid.Panel', {
            title: '查询结果',
            anchor: '100% 70%',
            frame: true,
            forceFit: true,
            columns: cm,
            id: 'class_info_grid',
            store: store
        });
    }

}
