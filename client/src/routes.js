import React from 'react';

const AllPlayers = React.lazy(() => import('./views/PlayersTable'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const AcworthEagles = React.lazy(() => import('./views/teams/AcworthEagles'));
const AtkinsonRules = React.lazy(() => import('./views/teams/AtkinsonRules'));
const BeatsByRay = React.lazy(() => import('./views/teams/BeatsByRay'));
const EssendonBombers = React.lazy(() => import('./views/teams/EssendonBombers'));
const GoBigOrGoHome = React.lazy(() => import('./views/teams/GoBigOrGoHome'));
const GTechNick = React.lazy(() => import('./views/teams/GTechNick'));
const KickersAndQBs = React.lazy(() => import('./views/teams/KickersAndQBs'));
const TampaBayBadgers = React.lazy(() => import('./views/teams/TampaBayBadgers'));
const TheClevelandSteamers = React.lazy(() => import('./views/teams/TheClevelandSteamers'));
const TrustTheProcess = React.lazy(() => import('./views/teams/TrustTheProcess'));


const routes = [
  { path: '/', exact: true, name: 'Home', component: AllPlayers },
  { path: '/Dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/AllPlayers', name: 'All Players', component: AllPlayers },
  { path: '/AcworthEagles', name: 'Acworth Eagles', component: AcworthEagles },
  { path: '/AtkinsonRules', name: 'Atkinson Rules', component: AtkinsonRules },
  { path: '/BeatsByRay', name: 'Beats By Ray', component: BeatsByRay },
  { path: '/EssendonBombers', name: 'Essendon Bombers', component: EssendonBombers },
  { path: '/GoBigOrGoHome', name: 'Go Big or Go Home', component: GoBigOrGoHome },
  { path: '/GTechNick', name: 'GA Tech Nick', component: GTechNick },
  { path: '/KickersAndQBs', name: 'Kickers and QBs', component: KickersAndQBs },
  { path: '/TampaBayBadgers', name: 'Tampa Bay Badgers', component: TampaBayBadgers },
  { path: '/TheClevelandSteamers', name: 'Cleveland Steamers', component: TheClevelandSteamers },
  { path: '/TrustTheProcess', name: 'Trust The Process', component: TrustTheProcess },
];

export default routes;
