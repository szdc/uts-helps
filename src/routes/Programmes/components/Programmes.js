import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import CenterLayout from 'layouts/CenterLayout'
import { IconCall, IconEmail, IconLocation } from 'components/Icons'

import classes from './Programmes.scss'
import strings from './Programmes.strings'

export default class Programmes extends React.Component {

  /**
   * Renders the programmes placeholder.
   *
   * @returns {XML}
   */
  render() {
    return (
      <CenterLayout>
        <p className={classes.text}>{strings.text_programmes_placeholder} {strings.text_contact}</p>
        <br />
        <RaisedButton
          icon={<IconLocation style={{color: 'white'}} />}
          href='https://goo.gl/maps/EmgFaKi1BZT2'
          label='CB01.05.25'
          primary
          style={{width: '265px'}}
        />
        <br /><br />
        <RaisedButton
          icon={<IconCall style={{color: 'white'}} />}
          href='tel:0295142000'
          label='(02) 9514 2000'
          primary
          style={{width: '265px'}}
        />
        <br /><br />
        <RaisedButton
          icon={<IconEmail style={{color: 'white'}} />}
          href='mailto:help@utshelps.ddns.net'
          label='help@utshelps.ddns.net'
          primary
          style={{width: '265px'}}
        />
      </CenterLayout>
    )
  }
}
