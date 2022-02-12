import React, { useState, useRef, useEffect } from 'react';
import RequestDemo from './components/RequestDemo'
import ImageDemo from './components/ImageDemo'
import './App.css';

// TODO:
// - add github icon
// - add docs
// - publish to npm
// - write an article
// - implement cancelable request (pased on p-cancelable)
// 

// tsc -w

type Section = 'useCancelableRequest' | 'useCancelableImage';

const SectionComponent = {
  useCancelableRequest: RequestDemo,
  useCancelableImage: ImageDemo,
}

function App() {
  const [isListVisible, setIsListVisible] = useState(true)
  const [activeSection, setActiveSection] = useState<Section>('useCancelableRequest')
  const spanRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const DemoComponent = SectionComponent[activeSection]
  const sectionNames = Object.keys(SectionComponent)
  
  function setHideTimeout(sec: number) {
    if (spanRef?.current) {
      spanRef.current.innerText = sec.toString();
    }

    if (sec > 0) {
      timerRef.current = setTimeout(() => {
        setHideTimeout(--sec);
      }, 1000);
    } else {
      setIsListVisible(false)
    }
  }

  useEffect(() => {
    setIsListVisible(true);
    timerRef.current && clearInterval(timerRef.current)
    setHideTimeout(5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection])
  return (
    <div className="App">
      <div>
        <h1>react-cancelable</h1>
        <span>Open Network tab to be sure all pending requests will be canceled</span>
      </div>
      <br />
      <div className='timer'>
        <span>Requests will be canceled in <span ref={spanRef}></span></span>
      </div>
      <br />
      <div className='tabs'>
        {sectionNames.map(key => (
          <h2
            key={key}
            className={activeSection === key ? 'tabName tabName-active' : 'tabName'}
            onClick={() => setActiveSection(key as Section)}
          >
            <code className='code'>{key}</code>
          </h2>
        ))}
      </div>
      {
        !isListVisible && <h4>List is unmounted. Pending requests are canceled.</h4>
      }
      {
        isListVisible && <DemoComponent />
      }
    </div>
  );
}

export default App;
