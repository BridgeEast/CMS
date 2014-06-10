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
                handler: function(){}
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
            name: 'multimedia'
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

    createGrid: function(){
        var cm = [{
            text: '教室编号'
        }, {
            text: '位置'
        }, {
            text: '最大容量'
        }, {
            text: '多媒体设备'
        }, {
            text: '备注'
        }];
        return Ext.create('Ext.grid.Panel', {
            title: '查询结果',
            anchor: '100% 70%',
            frame: true,
            forceFit: true,
            columns: cm,
            store: []
        });
    }

}
