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
  { path: '/AcworthEagles', name: 'Acworth Eagles', component: AcworthEagles },
  { path: '/AtkinsonRules', name: 'Dashboard', component: AtkinsonRules },
  { path: '/BeatsByRay', name: 'Acworth Eagles', component: BeatsByRay },
  { path: '/EssendonBombers', name: 'Dashboard', component: EssendonBombers },
  { path: '/GoBigOrGoHome', name: 'Acworth Eagles', component: GoBigOrGoHome },
  { path: '/GTechNick', name: 'Dashboard', component: GTechNick },
  { path: '/KickersAndQBs', name: 'Acworth Eagles', component: KickersAndQBs },
  { path: '/TampaBayBadgers', name: 'Dashboard', component: TampaBayBadgers },
  { path: '/TheClevelandSteamers', name: 'Acworth Eagles', component: TheClevelandSteamers },
  { path: '/TrustTheProcess', name: 'Dashboard', component: TrustTheProcess },
];

export default routes;
