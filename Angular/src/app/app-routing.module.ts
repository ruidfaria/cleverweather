import { NgModule 					}	from	'@angular/core'		;
import { Routes, RouterModule 		}	from	'@angular/router'	;

import {	clWeatherPageComponent	}	from	"./Pages/weather/clWeatherPageComponent"


const routes: Routes = 
[

{path:""		,component:clWeatherPageComponent}
];

@NgModule
({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})

export class AppRoutingModule 
{ 
}
