import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Tooltip } from 'antd'
import { withTranslation } from 'react-i18next'

class InstanceManagerComponent extends React.Component {
  render() {
    const { instanceManagerData } = this.props.host
    const engineimage = this.props.engineimage.data
    const defaultInstanceManager = this.props.defaultInstanceManager
    const defaultEngineImage = this.props.defaultEngineImage
    const currentNode = this.props.currentNode
    const t = this.props.t

    let data = []
    let engineimageObj = { name: t('instanceManager.name.engineImage'), image: defaultEngineImage.value, state: t('instanceManager.state.notDeployed'), id: 'engineRowKey' }

    engineimage.forEach((item) => {
      if (defaultEngineImage.value === item.image && item.nodeDeploymentMap && item.nodeDeploymentMap[currentNode.id]) {
        engineimageObj.state = t('instanceManager.state.deployed')
      }
    })
    data.push(engineimageObj)

    instanceManagerData.forEach((item) => {
      let instanceManagerObj = { name: t('instanceManager.name.instanceManager'), image: 'N/A', state: 'N/A', id: 'instanceRowKey' }
      if (defaultInstanceManager.value === item.image && item.nodeID === currentNode.id) {
        instanceManagerObj.image = item.image
        // Engine will deprecated in v1.6.x
        if (item.managerType === 'engine') {
          instanceManagerObj.name = `${instanceManagerObj.name} (${t('instanceManager.text.deprecated')})`
          let replicaCurrentState = item.replicaCurrentState
          !currentNode.disks ? replicaCurrentState = 'N/A' : ''
          instanceManagerObj.state = `${t('instanceManager.state.engine')}: ${item.currentState}  |  {t('instanceManager.state.replica')}: ${replicaCurrentState}`
        } else if (item.managerType === 'aio') {
          instanceManagerObj.state = item.currentState
        }
      }
      data.push(instanceManagerObj)
    })

    const columns = [
      {
        title: t('common.name'),
        key: 'name',
        width: 220,
        render: (record) => {
          return (
            <Tooltip title={record.name === t('instanceManager.name.engineImage') ? t('instanceManager.tooltip.engineImage') : t('instanceManager.tooltip.instanceManager')}>
              <div>{record.name}</div>
            </Tooltip>
          )
        },
      },
      {
        title: t('instanceManager.columns.image'),
        key: 'version',
        width: 220,
        render: (record) => {
          return (
            <div>{record.image}</div>
          )
        },
      },
      {
        title: t('instanceManager.columns.state'),
        key: 'state',
        width: 200,
        render: (record) => {
          return (
            <div>{record.state}</div>
          )
        },
      },
    ]
    return (
      <div>
        <Table
          bordered={false}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={record => record.id}
          height={'100%'}
          scroll={{ y: 400 }}
        />
      </div>
    )
  }
}

InstanceManagerComponent.propTypes = {
  t: PropTypes.func,
  host: PropTypes.object,
  engineimage: PropTypes.object,
  defaultInstanceManager: PropTypes.object,
  defaultEngineImage: PropTypes.object,
  currentNode: PropTypes.object,
}

export default connect(({ host, engineimage }) => ({ host, engineimage }))(withTranslation()(InstanceManagerComponent))
