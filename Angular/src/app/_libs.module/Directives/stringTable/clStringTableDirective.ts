

import	{	Directive, TemplateRef,OnInit, EmbeddedViewRef	}	from 	'@angular/core';
import	{	Interfaces										}	from	"../../Interfaces/Interfaces"

function	extractItems	(template:TemplateRef<any>):Interfaces.StringItem[]
{
const		items:Interfaces.StringItem[]=[]
			try
			{
			let 	view:EmbeddedViewRef<any>=template.createEmbeddedView({});
			const 	nodes=[...view.rootNodes];
			let		ix:number=0;

				view.destroy();

				for(const n of nodes)
				{
					if(n.nodeName==="DIV")
					{
					let text:string=n.innerText;
						if(typeof text === "string")
						{
							text=text.trim();
							if(text.length>0)
							{
							const id:string=n.id.trim();
								if(id.length>0)
								{
									items.push({id,text});
								}
							}
						}
					}
				}
			}
			catch(e)
			{
				console.error(e);
			}
			return(items);
}

@Directive
({
selector	:'[clStringTable]',
})

export class clStringTableDirective		implements	OnInit
{
items	:Interfaces.StringItem[]	=[];
table	:{[id:string]:string}		={}

constructor	(private template: TemplateRef<any>) 
{ 
}

extractItems()
{
			this.items=extractItems(this.template);
			for(const i of this.items)
			{
				this.table[i.id]=i.text;
			}
}

ngOnInit	()
{
			this.extractItems();
}

}
