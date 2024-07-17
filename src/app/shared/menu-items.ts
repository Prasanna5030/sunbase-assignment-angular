import { Injectable} from '@angular/core';

export interface Menu{
    state: string,
    name:string,
    type:string,
    icon:string,
    role:string,
}

const MENUITEMS=[

    {state:'user' , name:'Manage Users',type:'link' ,icon:'people', role:'user:create,user:read,admin:read,ROLE_ADMIN,admin:create'}
]

@Injectable()
export class MenuItems{
    getMenuItems():Menu[]{
        return MENUITEMS;
    }
}

