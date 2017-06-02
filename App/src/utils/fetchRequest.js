
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
            // formData.append('json',JSON.stringify(action));

            return (async()=>{
                try {
                    let response = await fetch(this.url,{
                        method: this.method,
                        mode: 'cros',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },

                        body: JSON.stringify(action),
                        // catch: 'default',
                        // credentials: 'include',
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