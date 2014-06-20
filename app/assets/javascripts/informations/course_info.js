courseInfo= {
    init: function(){
        CMS.mainPanel=Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'anchor',
            items: [this.createForm(), this.createGrid()]
        });
    },

    queryCourse: function(){ 
        var value = Ext.getCmp('course').getForm().getValues();
        Ext.getCmp('course_grid').store.load({ params: value });
    },

    createForm: function(){
        var tbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '查询',
                iconCls: Wando.icons.query,
                scope: this,
                handler: function(){
                    this.queryCourse();
                }
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
                xtype: 'numberfield',
                minValue: 0,
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
            id: 'course',
            layout: 'column',
            bodyPadding: 30,
            defaults: {
                columnWidth: .33
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

    createGrid: function(){
        var cm = [{
            text: '课程代号',
            dataIndex: 'number'
        }, {
            text: '课程名称',
            dataIndex: 'name'
        }, {
            text: '任课老师',
            dataIndex: 'teacher'
        }, {
            text: '选课人数',
            dataIndex: 'quantity'
        }, {
            text: '要求使用多媒体',
            dataIndex: 'multimedia'
        }, {
            text: '上课地点',
            dataIndex: 'address'
        }];

        var store = Ext.create('Ext.data.Store', { 
          fields: ['id','number', 'name', 'teacher', 'quantity', 'multimedia','address'],
          proxy: { 
              url: '/informations/query_course.json',
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
            id: 'course_grid',
            forceFit: true,
            columns: cm,
            store: store
        });
    }

}
