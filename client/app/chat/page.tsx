import Image from 'next/image'
import './styles/index.scss';
import HeaderContent from '@/components/HeaderContent';
import Chat from './chat';

export default function Home() {
  return (
    <>
      <Chat />
    </>
    // <div className='chat-wrapper'>
    //   chat app
    // </div>
  )
}
