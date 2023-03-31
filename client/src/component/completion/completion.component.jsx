import { useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid'
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
  currentColumn,
}) => {
  const [openSuggestionContainer, setSuggestionContainer] = useState(false)
  return (
    <div className='completionContainer'>
      <InputField
        label={label}
        onChange={onChange}
        value={value}
        onFocus={() => setSuggestionContainer(true)}
      />
      {data.length > 0 && openSuggestionContainer && (
        <div className='suggestionContainer'>
          {data.map((item) => {
            return (
              <div
                key={item[extractData.key2]}
                className='suggestionList'
                onClick={() => {
                  setInputValue(item[currentColumn])
                  setCurrentItems({
                    ...currentItems,
                    [extractData.key1]: item[extractData.key2],
                  })
                  setSuggestionContainer(false)
                }}
              >
                {columns.map((column) => {
                  return (
                    <span key={v4()} className='suggestionItem'>
                      {item[column]}
                    </span>
                  )
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
