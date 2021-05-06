
import	{	Component					,
			ChangeDetectionStrategy		,
			ViewChild					,
			TemplateRef					}	from '@angular/core'

@Component
({
selector		: 'clDebug'			,
templateUrl		: './clDebugComponent.html'	,
styleUrls		: ['./clDebugComponent.scss']	,
changeDetection	:ChangeDetectionStrategy.OnPush			,
})

export class	clDebugComponent	
{
@ViewChild("content") 	content:TemplateRef<any>				;
get debugMode	():boolean
{
			return((console as any).clDebug)
}


static		initialize():void
{
			if(document.URL.includes("localhost"))
			{
				(console as any).clDebug=true;
			}
}

}
