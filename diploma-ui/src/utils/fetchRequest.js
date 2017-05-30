
class Request{
    constructor(){
    }
    get(url){
        this.url = url;
        this.method = 'get';
        return this

    }
    post(url){

        this.url = url;
        this.method = 'post';
        return this
    }
    send(action){
        if (this.method === 'post'){
            // let formData = new FormData();
            // formData.append('text',JSON.stringify(action));
            let headers = new Headers({
                "Content-Type": "application/json; charset=UTF-8"
            });


            return (async()=>{
                try {
                    let response = await fetch(this.url,{
                        method: this.method,
                        body: JSON.stringify(action),
                        headers: headers,
                        catch: 'default',
                        credentials: 'include',
                    });
                    let body = await response.json();
                    return body
                } catch (error){
                    console.log(error);
                }
            })()

        } else if (this.method === 'get'){

            let a = action ? Object.entries(action) : '';
            let parms = a ? '?' + a.map(item=>{
                return item.join('=');
            }).join('&') : '';
            let url =  this.url + parms;

            return (async()=>{
                try {
                    let response = await fetch(url,{
                        method: this.method,
                        catch: 'default',
                        credentials: 'include',
                    });
                    let body = await response.json();
                    return body
                } catch (error){
                    console.log(error);
                }
            })()
        }

    }
}
const request = new Request();
export default request