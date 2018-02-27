import Bluebird from 'bluebird';

import { Dispatch } from 'app/actionTypes';
import { Load, Save } from 'app/util/storage';

export const USERCODE = 'usercode';
export const WSLIST = 'ws_list';

type initAction = ['app/init'];
function init() {
    return (dispatch: Dispatch) => {
        return Bluebird.all([
            Load(USERCODE, ''),
            Load(WSLIST, []),
        ])
        .then(([usercode = '', wslist = []]) => {
            dispatch(['/app/initialize', { usercode }]);
            dispatch(['/ws/list/update', wslist]);
        });
    };
}

export type appActions = initAction;
export default {
    init,
};
