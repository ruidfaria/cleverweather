import	{	Component					,
			ChangeDetectionStrategy,		
			Input,
			ElementRef} from '@angular/core'




function	setWrap(ne:HTMLElement,w:string|boolean)
{
			if(typeof w==="string")
			{
				w=w.toLowerCase();
				if(w==="reverse" || w==="r")
				{
					ne.style.flexWrap="wrap-reverse";
					return;
				}
				else
				{
					w=true;
				}

			}

			if(w===true)
			{
				ne.style.flexWrap="wrap"
			}
}


@Component
({
selector	: 'clHContainer'					,
templateUrl	: './clHContainerComponent.html'	,
styleUrls	: ['./clHContainerComponent.scss']	,
changeDetection	:ChangeDetectionStrategy.OnPush	,
})


export class	clHContainerComponent	
{
@Input	() fxWrap:string|true;
constructor		(private er:ElementRef)
{ 
}

ngOnChanges		()
{
				setWrap(this.er.nativeElement,this.fxWrap);
}

}