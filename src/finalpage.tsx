import 'bootstrap/dist/css/bootstrap.min.css';
import "./finalpage.css";

const FinalPage : React.FC<{ userData: any }> = ({ userData }) => {
  return (
        <div className='content'>
            <h1>&#62; Your Anime Taste was {userData['disc'] ? userData['disc'].toString() : '(disc)'} bad.</h1>
            <p>&#62; Thank your obsessions with {userData['top_show'] ? userData['basic'].toString() : '(basic)'}, (I've Had) The Time of My Life <br />- From "Dirty Dancing" Soundtrack, and Eminem for that. <br />
            &#62;Based on your watching habits, I can also tell you your anime list was... 
            <br />&#62; boomer bad
            <br />&#62; your-gen-z-is-showing bad
            <br />&#62; depressed-bops bad
            <br />&#62; only-wears-converse-allstars bad
            <br />&#62; moonwalk bad
            <br />&#62; Here's what else I learned in that hellscape:
            </p>
            <div>
                <h6>You listen to these too much:</h6>
                <ul>
                    {/* <li>{(userData['top_5_show'])[0] ? (userData['top_5_show'])[0].toString() : '(top_5_show_1)'}</li>
                    <li>{(userData['top_5_show'])[1] ? (userData['top_5_show'])[1].toString() : '(top_5_show_2)'}</li>
                    <li>{(userData['top_5_show'])[2] ? (userData['top_5_show'])[2].toString() : '(top_5_show_3)'}</li>
                    <li>{(userData['top_5_show'])[3] ? (userData['top_5_show'])[3].toString() : '(top_5_show_4)'}</li>
                    <li>{(userData['top_5_show'])[4] ? (userData['top_5_show'])[4].toString() : '(top_5_show_5)'}</li> */}
                </ul>
            </div>
            <div>
                <h6>You stan these artists to an uncomfortable extent:</h6>
                <ul>
                    {/* <li>{userData['top_5_genrea'][0] ? userData['top_5_genrea'][0].toString() : '(top_5_genrea_1)'}</li>
                    <li>{userData['top_5_genrea'][1] ? userData['top_5_genrea'][1].toString() : '(top_5_genrea_2)'}</li>
                    <li>{userData['top_5_genrea'][2] ? userData['top_5_genrea'][2].toString() : '(top_5_genrea_3)'}</li>
                    <li>{userData['top_5_genrea'][3] ? userData['top_5_genrea'][3].toString() : '(top_5_genrea_4)'}</li>
                    <li>{userData['top_5_genrea'][4] ? userData['top_5_genrea'][4].toString() : '(top_5_genrea_5)'}</li> */}
                </ul>
            </div>

            <p>
                You are {userData['basic'] ? userData['basic'].toString() : '(basic)'}% basic.
                <br />
                You are too trendy for your own good.
            </p>

        </div>
    );
}

export default FinalPage;
