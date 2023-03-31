import { useEffect, useRef, useState } from 'react'
import InputField from '../inputField/inputField.component'
import './completion.style.css'
const Completion = ({
  value,
  setInputValue,
  label,
  onChange,
  data = [],
  setCurrentItems,
  currentItems,
  extractData,
  columns = [],
}) => {
  const [openSuggestionContainer, setSuggestinContainer] = useState(false)
  return (
    <div className='completionContainer'>
      <InputField
        label={label}
        onChange={onChange}
        value={value}
        onFocus={() => setSuggestinContainer(true)}
      />
      {data.length > 0 && openSuggestionContainer && (
        <div className='suggestionContainer'>
          {data.map((item) => {
            return (
              <div
                className='suggestionList'
                onClick={() => {
                  setInputValue(item.displayname)
                  setCurrentItems({
                    ...currentItems,
                    [extractData.key1]: item[extractData.key2],
                  })
                  setSuggestinContainer(false)
                }}
              >
                {columns.map((column) => {
                  return <span className='suggestionItem'>{item[column]}</span>
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Completion
