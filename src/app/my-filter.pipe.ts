import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], fv: number): any {
        if (!items || !fv) {
            return items;
        }
        // alert(JSON.stringify(filter));
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.price <= fv);
    }
}