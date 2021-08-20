import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['League']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Players',
    to: '/base/tables',
    icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Teams']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Acworth Eagles',
    to: '/AcworthEagles',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Atkinson Rules',
    to: '/AtkinsonRules',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Beats by Ray',
    to: '/BeatsByRay',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Essendon Bombers',
    to: '/EssendonBombers',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Go Big or Go Home',
    to: '/GoBigOrGoHome',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'GTechNick',
    to: '/GTechNick',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kickers and QBs!',
    to: '/KickersAndQBs',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tampa Bay Badgers',
    to: '/TampaBayBadgers',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'The Cleveland Steamers',
    to: '/TheClevelandSteamers',
    icon: 'cil-ChevronRight',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Trust the Process',
    to: '/TrustTheProcess',
    icon: 'cil-ChevronRight',
  },
]

export default _nav
