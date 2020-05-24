import React from 'react'

export default class MyNav extends React.Component{
    // constructor(){
    //     super()
    //     this.state ={}
    // }

    render(){
        console.log(this.props) 
        return(
            <div>
                {
                    <ul>
                        {/*利用props进行传值 */}
                        {
                            this.props.nav.map((ele,index)=>{
                            return <li key={index} > {ele}</li>
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
}