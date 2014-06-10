courseInfo= {
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
            xtype: 'fieldcontainer',
            defaults: {
                labelAlign: 'right',
                xtype: 'textfield'
            },
            items: [{
                fieldLabel: '课程名称',
                name: 'name'
            }, {
                fieldLabel: '任课老师',
                name: 'teacher'
            }, {
                fieldLabel: '选课人数',
                name: 'quantity'
            }]
        }, {
            xtype: 'fieldcontainer',
            defaults: {
                labelAlign: 'right',
                xtype: 'textfield'
            },
            items: [{
                fieldLabel: '多媒体设备',
                name: 'multimedia'
            }, {
                fieldLabel: '起始周',
                name: 'week_s'
            }, {
                fieldLabel: '结束周',
                name: 'week_e'
            }]
        }, {
            xtype: 'fieldcontainer',
            defaults: {
                labelAlign: 'right',
                xtype: 'textfield'
            },
            items: [{
                fieldLabel: '星期',
                name: 'date'
            }, {
                fieldLabel: '节次',
                name: 'hour'
            }]
        }];

        return Ext.create('Ext.form.Panel', {
            anchor: '100% 30%',
            tbar: tbar,
            frame: true,
            layout: 'column',
            bodyPadding: 30,
            defaults: {
                columnWidth: .33
            },
            items: items
        })

    },

    createGrid: function(){
        var cm = [{
            text: '课程代号'
        }, {
            text: '课程名称'
        }, {
            text: '任课老师'
        }, {
            text: '选课人数'
        }, {
            text: '要求使用多媒体'
        }, {
            text: '上课地点'
        }]
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
