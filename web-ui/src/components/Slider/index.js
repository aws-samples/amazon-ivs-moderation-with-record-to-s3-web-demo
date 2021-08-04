/* eslint eqeqeq: "off" */
/* eslint react-hooks/exhaustive-deps: "off" */
import React, {
  useEffect,
  useState,
  useContext
} from "react"
import { moderationTypes } from "../../constants/moderation"
import ThresholdsContext from "../../context/ThresholdsContext"
import { SET_MODERATION_THRESHOLDS } from "../../context/ThresholdsContextProvider"

import { Container, Slider, Input, Track, Range, ThumbLeft, ThumbRight } from './styled'

const MultiRangeSlider = ({ min, max, field, setShowActionButtons }) => {

  const [{moderationThresholds}, dispatch] = useContext(ThresholdsContext)
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const alert = moderationThresholds[0]
    const action = moderationThresholds[1]
    setMinVal(alert[field])
    setMaxVal(action[field])
  }, [min, max])

  const changeDelay = (inputValue, type) => {
    setShowActionButtons(true)
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      setTimer(
        setTimeout(() => {
          handleDispatch(inputValue, type)
        }, 700)
      );
  }

  const handleDispatch = (newInputValue, type) => {
    const isAlert = type === moderationTypes.ALERT

    const alertValues = moderationThresholds[0]
    const actionValues = moderationThresholds[1]

    const newModerationThresholds = [
      { ...alertValues, [field]: isAlert ? newInputValue : alertValues[field]},
      { ...actionValues, [field]: isAlert ? actionValues[field] : newInputValue}
    ]

    dispatch({
      type: SET_MODERATION_THRESHOLDS,
      moderationThresholds: newModerationThresholds,
    })
  }

  return (
    <Container className="container">
      <div>
        {minVal != 0 && (
          <>
            <Input
              disabled={minVal === 0}
              type="range"
              min={50}
              id="input-left" 
              max={100}
              value={minVal}
              onChange={(event) => {
                let value;
                maxVal == 0 ? value = event.target.value : value = Math.min(Number(event.target.value), Number(maxVal) - 4)
                setMinVal(value)
                changeDelay(value, moderationTypes.ALERT)
              }}
            />
          </>
        )} 

        {maxVal != 0 && (
          <>
            <Input
              disabled={maxVal === 0}
              type="range"
              id="input-right" 
              min={50}
              max={100}
              value={maxVal}
              onChange={(event) => {
                const value = Math.max(Number(event.target.value), Number(minVal) + 4);
                setMaxVal(value)
                changeDelay(value, moderationTypes.ACTION)
              }}
            />
          </>
        )}

        <Slider>
          <Track></Track>
          <Range style={{ display: minVal == 0 || maxVal == 0 ? 'none' : 'block', left: `${(minVal - 50)*2}%`, right: `${(100 - maxVal)*2}%`}}></Range>
          {minVal != 0 && (
          <ThumbLeft style={{left: `${(minVal - 50)*2}%`}}>{minVal}</ThumbLeft>
          )}
          {maxVal != 0 && (
            <ThumbRight style={{left: `${(maxVal - 50)*2}%`}}>{maxVal}</ThumbRight>
          )}
        </Slider>

      </div>
    </Container>
  );
};

export default MultiRangeSlider;
