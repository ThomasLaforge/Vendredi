import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'

interface VendrediAppBarProps extends DefaultProps {
}

interface VendrediAppBarState {
}

@inject(injector)
@observer
export default class VendrediAppBar extends React.Component<VendrediAppBarProps, VendrediAppBarState> {
    constructor(props: VendrediAppBarProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        const game = this.props.game
        {/* https://codesandbox.io/s/kk2889j305 */}
        return <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Vendredi
            </Typography>
            {/* <!--<div id="nbFightCards" class="info-main-value" title="Fight cards">{{ game.fightDeck.length() }}</div> */}

            {/* <div id="nbDangerCards" className='info-main-value' title="Danger cards">{ game.dangerDeck.length }}</div>
            
            <div id="nbAgingCards" title="Aging cards" className="info-main-value">{ game.agingDeck.length }</div> */}
            {/* --> */}
            {/* <!--<md-icon class="md-size-2x">delete</md-icon>                --> */}

            {/* <md-button class="md-icon-button" @click.native="showPirates">
                <md-icon class="md-size-2x" :class="game.level < 3 ? 'level-value-' + (game.level + 1) : 'level-value-pirates'">flag</md-icon>
            </md-button> */}

            <div className="pv">
                {/* <Icon className="pv-heart">favorite</Icon> */}
                <div className="pv-value">{game.robinson.PV}</div>
            </div> 
          </Toolbar>
        </AppBar>
    }
}