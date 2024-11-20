import { useEffect, useState } from 'react'
import './App.css'
import {texts, baseItems} from './constants'

interface ListItem {
  item: string;
  checked: boolean;
}

function App() {
  const [lang, setLang] = useState<'en' | 'pt'>('en');
  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'pt' : 'en')
  };

  // const [weather, setWeather] = useState<'cold' | 'warm'>('cold');
  // const weatherTexts: Record<'en' | 'pt', Record<'cold' | 'warm', string>> = {
  //   en: { cold: 'Cold', warm: 'Warm' },
  //   pt: { cold: 'Frio', warm: 'Quente' },
  // };

  // const toggleWeather = () => {
  //   setWeather(prev => prev === 'cold' ? 'warm' : 'cold')
  // }
  

  const [items, setItems] = useState<ListItem[]>(baseItems[lang].map(item => ({ item, checked: false})));

  useEffect(() => {
    setItems(baseItems[lang].map((item, index) => ({ item, checked: items[index].checked})))
  }, [lang])

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const buttonLabels: Record<'en' | 'pt', { switchLang: string; weather: string }> = {
    en: { switchLang: 'Switch to Portuguese', weather: 'Weather:' },
    pt: { switchLang: 'Mudar para Inglês', weather: 'Clima:' },
  };

  return (
    <>
      <button className='langButton'onClick={toggleLang}>
        {buttonLabels[lang].switchLang}
      </button>
{/* TODO: Add weather functionality just because */}
      {/* <button onClick={toggleWeather}>
        {buttonLabels[lang].weather} {weatherTexts[lang][weather]}
      </button> */}
      <h1 className='title'> {texts[lang].title}</h1>
      <h2 className='subtitle'> {texts[lang].subtitle}</h2>
      <div className="card">
        <ul className="item-list">
          {items.map((listItem, index) => (
            <li key={index} className={`list-item ${listItem.checked ? 'checked' : ''}`}>
              <input type='checkbox' checked={listItem.checked}
              onChange={() => toggleItem(index)} className="checkbox"/>
              {listItem.item}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
