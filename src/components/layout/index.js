import React from 'react'
import PageRevealer from 'components/page-revealer'
import { I18nProvider } from '@lingui/react';
import {Trans} from '@lingui/macro';
import { i18n } from '@lingui/core';
import Navbar from 'components/navbar'
import Footer from 'components/footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'scss/abstract.scss';
import { defaultLocale, dynamicActivate } from '../../utils/i18n';

const sectionData = [
  {id: 'home', display: <Trans>home</Trans>}, 
  {id: 'about', display: <Trans>about</Trans>}, 
  {id:'services', display: <Trans>services</Trans>, isDropdown: true}, 
  {id: 'portfolio', display: <Trans>portfolio</Trans>}, 
  {id: 'testimonials', display: <Trans>testimonials</Trans>}, 
  {id: 'pricing', display: <Trans>pricing</Trans>}, 
  {id: 'contact', display: <Trans>contact</Trans>}]

class Layout extends React.Component {

  componentDidUpdate() {
    window.location.reload(false);
  }

  componentDidMount() {
    dynamicActivate(defaultLocale);
  }


  render() {

    const { children } = this.props
    
    

    return (
      <div id="main">
        <I18nProvider i18n={i18n}>
          <Navbar scroll={this.props.isHome ? true : false} sections={sectionData} />
          <PageRevealer />
          <div>
            {children}
          </div>
          <Footer />
        </I18nProvider>
      </div>
    )
  }
}

export default Layout
