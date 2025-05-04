import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Scorecard() 
{
  const location = useLocation();
  var [strikerruns, setstrikerruns] = useState(0)
  var [strikerballs, setstrikerballs] = useState(0)
  var [strikerfours, setstrikerfours] = useState(0)
  var [strikersixes, setstrikersixes] = useState(0)

  const [nonstrikerruns, setnonstrikerruns] = useState(0)
  const [nonstrikerballs, setnonstrikerballs] = useState(0)
  const [nonstrikerfours, setnonstrikerfours] = useState(0)
  const [nonstrikersixes, setnonstrikersixes] = useState(0)

  const [bowlerballs, setbowerballs] = useState(0)
  const [bowlermaiden, setbowlermaiden] = useState(0)
  const [bowlerruns, setbowlerruns] = useState(0)
  const [bowlerwickets, setbowlerwickets] = useState(0)

  const [teamruns, setteamruns] = useState(0)
  const [teamwickets, setteamwickets] = useState(0)
  const [overs, setovers] = useState(0)
  const [tag, settag] = useState(true)
  const [overscompleted, setoverscompleted] = useState(0)

  const { hostteam, visitteam, totalovers, striker, nonstriker, bowler } = location.state || {};

  useEffect(() => 
    {
    if (bowlerballs > 0 && bowlerballs % 6 === 0) settag(curr => !curr);
    if(bowlerruns===0)setbowlermaiden(p=>p+1)
  }, [bowlerballs,bowlerruns]);


  function updatescore(val) 
  {
    if(val==='W'){
      setbowlerwickets(r=>r+1);
      return;
    }
    if (val % 2 === 1) {
      settag(curr => !curr);
    }
    if (tag) {
      setstrikerruns(r => r + val);
      if (val === 4) setstrikerfours(f => f + 1);
      if (val === 6) setstrikersixes(s => s + 1);
      setstrikerballs(b => b + 1);
    } else {
      setnonstrikerruns(r => r + val);
      if (val === 4) setnonstrikerfours(f => f + 1);
      if (val === 6) setnonstrikersixes(s => s + 1);
      setnonstrikerballs(b => b + 1);
    }

    setbowlerruns(r => r + val);

    setteamruns(r => r + val);
    setteamwickets(w => w + (val === 'W' ? 1 : 0));
    setovers(o => {
      return (overscompleted + bowlerballs / 10);
    });

    setbowerballs(prevBalls => {
      const newBalls = prevBalls + 1;
      const fullOvers = Math.floor(newBalls / 6);
      const ballsInCurrent = newBalls % 6;
      const oversDecimal = fullOvers + ballsInCurrent / 10;

      setovers(oversDecimal);
      return newBalls;
    });
  }
  
  return (
    <div className='row justify-content-center'>
      <div id='teams' className='row justify-content-center '>
        <div className='col-md-4' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="text" className="form-control" value={hostteam} readOnly placeholder="Host name" />
          <span>Vs</span>
          <input type="text" className="form-control" value={visitteam} readOnly placeholder="Visit name" />
        </div>
      </div>

      <div className='shadow-lg p-3 mb-3 bg-white rounded col-md-7'>
        <div><h3>{hostteam} Innings</h3> </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3>{teamruns}</h3> <h2>-</h2> <h3>{teamwickets}</h3> <h2>(</h2> <h3>{overs}</h3> <h2>)</h2>
        </div>
      </div>

      <div className='shadow-lg p-3 mb-3 bg-white rounded col-md-7'>
        <table className="table">
          <thead>
            <tr>
              <th>Batsman</th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ backgroundColor: tag ? '#d4edda' : 'transparent', color: tag ? 'red' : 'inherit', fontWeight: 'bold' }}>
                {striker}
              </td>
              <td>{strikerruns}</td>
              <td>{strikerballs}</td>
              <td>{strikerfours}</td>
              <td>{strikersixes}</td>
              <td>{strikerballs ? ((strikerruns / strikerballs) * 100).toFixed(2) : '0.00'}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: !tag ? '#d4edda' : 'transparent', color: !tag ? 'red' : 'inherit', fontWeight: !tag ? 'bold' : '' }}>
                {nonstriker}</td>
              <td>{nonstrikerruns}</td>
              <td>{nonstrikerballs}</td>
              <td>{nonstrikerfours}</td>
              <td>{nonstrikersixes}</td>
              <td>{nonstrikerballs ? ((nonstrikerruns / nonstrikerballs) * 100).toFixed(2) : '0.00'}</td>
            </tr>
          </tbody>
        </table>

        <table className="table">
          <thead>
            <tr>
              <th>Bowler</th>
              <th>O</th>
              <th>M</th>
              <th>R</th>
              <th>W</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bowler}</td>
              <td>{bowlerballs}</td>
              <td>{bowlermaiden}</td>
              <td>{bowlerruns}</td>
              <td>{bowlerwickets}</td>
              <td>{bowlerballs ? (bowlerruns / (bowlerballs / 6)).toFixed(2) : '0.00'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='shadow-lg p-3 mb-3 bg-white rounded col-md-7'>
        <h4>sgfdg</h4>
        <input type="button" className="btn btn-primary me-2" value="0" onClick={() => updatescore(0)} />
        <input type="button" className="btn btn-primary me-2" value="1" onClick={() => updatescore(1)} />
        <input type="button" className="btn btn-primary me-2" value="2" onClick={() => updatescore(2)} />
        <input type="button" className="btn btn-primary me-2" value="3" onClick={() => updatescore(3)} />
        <input type="button" className="btn btn-primary me-2" value="4" onClick={() => updatescore(4)} />
        <input type="button" className="btn btn-primary me-2" value="6" onClick={() => updatescore(6)} />
        <input type="button" className="btn btn-primary" value="W" onClick={() => updatescore('W')} />

      </div>
    </div>
  );
}