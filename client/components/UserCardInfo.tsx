import ellipse from '../app/assets/Ellipse 114.png'
import Rigor from '../app/assets/Rigor.png'
import Bronze from '../app/assets/Bronze.png'

const UserCardInfo = ()  =>
{
    return (
        <div className="card-info-container">
            <div className="user-info">
                <img className="ellipse" src={ellipse.src} alt="Ellipse" />
                <img className="user-picture" src={Rigor.src} alt="user picture" />
            </div> 
            <h1>Rigor</h1>
            <h2>In match</h2>
            <div className='user-state'>
                <img className='state' src={Bronze.src} alt="Bronze" />
                <h3>Bronze</h3>
            </div>
        </div>
    )
}

export default UserCardInfo;