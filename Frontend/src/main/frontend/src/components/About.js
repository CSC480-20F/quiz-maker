import React from 'react'
import {Card, Row, Col} from "react-bootstrap";

class About extends React.Component {
    render() {

        const engine = [{name: 'Matt Ljuljic', portfolio:'https://github.com/mljuljicPrograms'}, {name: 'Trevor Primus', portfolio:'https://www.linkedin.com/in/trevor-primus/'}];
        const gui = [{name: 'Anisha KC', portfolio:'https://github.com/KC-Anisha'}, {name: 'Nathan Payag', portfolio:'https://github.com/kiyain12'}];
        const usability = [{name: 'Juhui Kang', portfolio:'https://juhuikang.myportfolio.com/'}, {name: 'Leandro Garrido', portfolio:'https://leandrogarrido.myportfolio.com/'}, {name: 'Danielle LaRosa', portfolio:'google.com'}, {name: 'Michael Olson', portfolio:'https://michaelolson.design/'},  {name: 'Pashang Engineer', portfolio:'https://pashangengineer.com/'}];
        const requirements = [{name: 'Pashang Engineer', portfolio:'https://pashangengineer.com/'}, {name: 'Daniel Garcia', portfolio:'google.com'} ];

        const professors = [{name: 'Bastian Tenbergen'}, {name: 'Vanessa Maike'}, {name: 'Paul Austin'}]

        const professorscolumn = professors.map((person, i) => {
            return (
                    <Row style={{marginBottom:'20px'}} key={i}>
                        <Col style={{fontFamily:'Roboto', fontSize:'15px', color:'#235937'}}>{person.name}</Col>
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

        const copyrightContent = <> <p style={{fontFamily:'Roboto'}}>Quiz Maker is licensed under the MIT License. Permission is hereby granted, free of charge, to any 
        person obtaining a copy of this software and associated documentation files (the”Software”), to deal 
        in the Software without restriction, including without limitation the rights to use, copy, modify, merge, 
        publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the 
        Software is furnished to do so, subject to the following conditions.  </p> <br/>
        <p style={{fontFamily:'Roboto'}}>The above copyright notice and this permission shall be included in all copies or substantial portions 
        of the Software. </p> <br/>
        <p style={{fontFamily:'Roboto'}}>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
        LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN 
        NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p> </>

        const purposeContent = <p style={{fontFamily:'Roboto'}}>The purpose of Quiz Maker is to have students take the initiative in the learning process, while 
        making sure the knowledge they learned is preserved after each semester and easily accessible to users in a given course. 
        The intended audience of Quiz Maker is students, faculty and staff at SUNY Oswego. </p>


        return (
            <>
            <h1 className='header'> Acknowledgements </h1>

            <div style={{padding: '0.5%'}}></div> 

            <div className="container">
            <Card className="rounded-corner" style={{padding:'20px'}}>
                <Row style={{padding:'40px'}}>
                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u> Purpose </u>
                    </div>
                    {purposeContent}
                </Col>
                </Row>
            </Card>
           </div>
            

            <div className= 'container'>
            <Card className= 'rounded-corner' style={{padding:'20px'}}>
                <Row style={{padding:'40px'}}>
                    <Col>
                        <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                            <u> Advisors </u>
                        </div>
                        {professorscolumn}
                    </Col>
                </Row>
            
            <Row style={{padding:'40px'}}>
                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u> Engine </u>
                    </div>
                    {enginecolumn}
                </Col>

                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u> GUI </u>
                    </div>
                    {guicolumn}
                </Col>
            </Row>

            <Row style={{padding:'40px'}}>
                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u>Usability</u>
                    </div>
                    {usabilitycolumn}
                </Col>

                <Col>
                    <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                        <u>Requirements</u>
                    </div>
                    {requirementscolumn}
                </Col>
            </Row>
            </Card>
            </div>

            <div className="container">
            <Card className="rounded-corner" style={{padding:'20px'}}>
                <Row style={{padding:'40px'}}>
                    <Col>
                        <div className='margin-subtitle' style={{marginBottom:'20px'}}>
                            <u>Copyright</u>
                        </div>
                        {copyrightContent}
                    </Col>
                </Row>
            </Card>
            </div>

            </>
        )
    }
}

export default About
