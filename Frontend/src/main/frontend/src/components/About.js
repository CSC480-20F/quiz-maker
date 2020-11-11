import React from 'react'
import {Card, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom'

class About extends React.Component {
    render() {

        const engine = [{name: 'Matt Ljuljic', portfolio:'https://github.com/mljuljicPrograms'}, {name: 'Trevor Primus', portfolio:'https://www.linkedin.com/in/trevor-primus/'}, {name: 'Michael Olson', portfolio:'https://michaelolson.design/'}, {name: 'Daniel Garcia', portfolio:'google.com'} ];
        const gui = [{name: 'Anisha KC', portfolio:'https://github.com/KC-Anisha'}, {name: 'Nathan Payag', portfolio:'https://github.com/kiyain12'}, {name: 'Juhui Kang', portfolio:'https://juhuikang.myportfolio.com/'}, {name: 'Leandro Garrido', portfolio:'https://leandrogarrido.myportfolio.com/'},{name: 'Trevor Primus', portfolio:'google.com'} ];

        const usability = [{name: 'Juhui Kang', portfolio:'https://juhuikang.myportfolio.com/'}, {name: 'Leandro Garrido', portfolio:'https://leandrogarrido.myportfolio.com/'}, {name: 'Danielle LaRosa', portfolio:'google.com'}, {name: 'Michael Olson', portfolio:'https://michaelolson.design/'},  {name: 'Pashang Engineer', portfolio:'https://pashangengineer.com/'}];
        const requirements = [{name: 'Pashang Engineer', portfolio:'https://pashangengineer.com/'}, {name: 'Daniel Garcia', portfolio:'google.com'} ];

        const professors = [{name: 'Bastian Tenbergen'}, {name: 'Vanessa Maike'}]

        const professorscolumn = professors.map((person, i) => {
            return (
                    <Row style={{marginBottom:'20px'}} key={i}>
                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}}>{person.name}</Col>
                        {/* <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}} >
                            <a rel="noreferrer noopener" href={person.portfolio} target="_blank">Portfolio</a>
                        </Col> */}
                    </Row>
            ) 
        })

        const enginecolumn = engine.map((person, i) => {
            return (
                    <Row style={{marginBottom:'20px'}} key={i}>
                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}}>{person.name}</Col>
                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}} >
                            <a rel="noreferrer noopener" href={person.portfolio} target="_blank">Portfolio</a>
                        </Col>
                    </Row>
            ) 
        })

        const guicolumn = gui.map((person, i) => {
            return (
                    <Row style={{marginBottom:'20px'}}  key={i}>
                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}}>{person.name}</Col>
                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}}>
                            <a rel="noreferrer noopener" href={person.portfolio} target="_blank">Portfolio</a>
                        </Col>
                    </Row>
            ) 
        })

        const usabilitycolumn = usability.map((person, i) => {
            return (
                    <Row style={{marginBottom:'20px'}}  key={i}>
                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}} >{person.name}</Col>
                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}} >
                            <a rel="noreferrer noopener" href={person.portfolio} target="_blank">Portfolio</a>
                        </Col>
                    </Row>
            ) 
        })

        const requirementscolumn = requirements.map((person, i) => {
            return (
                    <Row style={{marginBottom:'20px'}}  key={i}>

                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}}> {person.name}</Col>

                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}}>
                            <a rel="noreferrer noopener" href={person.portfolio} target="_blank">Portfolio</a>
                        </Col>
                    </Row>
            ) 
        })



        return (
            <>
            <h1 className='header'>
                Acknowledgements
            </h1>

            <div style={{padding: '0.5%'}}></div> 
            
            <div className= 'container'>
            <Card className= 'rounded-corner' style={{padding:'20px'}}>


            <Row style={{padding:'40px'}}>
            <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u>
                        Professors
                        </u>
                    </div>
                    {professorscolumn}
                </Col>

            </Row>
            
            <Row style={{padding:'40px'}}>
            
                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u>
                        Engine
                        </u>
                    </div>
                    {enginecolumn}
                </Col>

                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u>
                        GUI
                        </u>
                    </div>
                    {guicolumn}
                </Col>
            </Row>

            <Row style={{padding:'40px'}}>
                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u>
                        Usability
                        </u>
                    </div>
                    {usabilitycolumn}
                </Col>

                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u>
                        Requirements
                        </u>
                    </div>
                    {requirementscolumn}
                </Col>

            </Row>



            </Card>
            </div>
            </>

        )
    }
}

export default About
