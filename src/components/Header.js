import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
    return (
        <header>
            <div className="socialMedia" >
                <ul className="d-flex">
                    <li className="mr-18">
                        <a href="https://www.facebook.com/profile.php?id=100044832372524"><img width={64} height={64} src="/img/facebook.svg" /></a>
                    </li>
                    <li>
                        <a href="https://telegram.im/@teatr_mayakovskogo"><img width={64} height={64} src="/img/telegram.svg" /></a>
                    </li>
                </ul>
            </div>
            <Link to="/">
                <div className="mayak">
                    <img width={143} height={149} src="/img/logo2.png" />
                    <div className="headerInfo">
                        <h3>Московский Академический Театр Имени</h3>
                        <h3>Владимира Маяковского</h3>
                    </div>
                </div>
            </Link>

            <Navbar style={{padding:10, marginTop:20, fontSize:25}} bg="black" variant="dark">
                <Container>
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link style={{paddingInlineEnd:65}} href="/performances">Спектакли</Nav.Link>
                        <Nav.Link style={{paddingInlineEnd:65}} href="/actors">Актеры</Nav.Link>
                        <Nav.Link style={{paddingInlineEnd:65}} href="/authors">Авторы</Nav.Link>
                        <Nav.Link style={{paddingInlineEnd:65}} href="/concerttours">Гастроли</Nav.Link>
                        <Nav.Link style={{paddingInlineEnd:65}} href="/tickets">Билеты</Nav.Link>
                        <Nav.Link style={{paddingInlineEnd:65}} href="/stagedirectors">Постановщики</Nav.Link> 
                        <Nav.Link style={{paddingInlineEnd:65}} href="/musicians">Музыканты</Nav.Link>                  
                        {/* <Nav.Link style={{paddingInlineEnd:50}} href="/roles">Роли</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
            <br />

        </header>
    )
}

export default Header;