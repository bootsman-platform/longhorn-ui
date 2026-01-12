import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Popover, Icon, Select } from 'antd'
import styles from './Header.less'
import Menus from './Menu'
import longhornLogo from '../../assets/images/longhorn-logo.svg'
import { withTranslation } from 'react-i18next'

const { Option } = Select

function Header({ isNavbar, menuPopoverVisible, location, switchMenuPopover, lang, dispatch }) {
  const menusProps = {
    location,
    isNavbar,
    switchMenuPopover,
  }

  const handleMenuClick = (value) => {
    dispatch({
      type: 'app/setLang',
      payload: value,
    })
  }

  return (
    <div className={styles.header}>
      <Row align="middle">
        <Col className={styles.logoCol}>
          <img src={longhornLogo} alt="LONGHORN" />
        </Col>
        {
          isNavbar
            ? <Col className={styles.popupMenuCol}>
                <Popover
                  placement="bottomLeft"
                  onVisibleChange={switchMenuPopover}
                  visible={menuPopoverVisible}
                  overlayClassName={styles.popupMenu}
                  trigger="click"
                  content={<Menus {...menusProps}
                  />}>
                  <div className={styles.button}>
                    <Icon type="bars" />
                  </div>
                </Popover>
              </Col>
            : <Col className={styles.menuCol} lg={16} md={16} sm={0} xs={0}>
                <Menus {...menusProps} />
              </Col>
        }
        <Col>
          <Select value={lang} style={{ width: 120 }} onChange={handleMenuClick}>
            <Option value="en">En</Option>
            <Option value="ru">Ru</Option>
          </Select>
        </Col>
      </Row>
    </div>
  )
}

Header.propTypes = {
  isNavbar: PropTypes.bool,
  location: PropTypes.object,
  menuPopoverVisible: PropTypes.bool,
  switchMenuPopover: PropTypes.func,
  lang: PropTypes.string,
  dispatch: PropTypes.func,
}

export default withTranslation()(Header)
