/* eslint eqeqeq: "off" */
import React, { useContext, useState } from 'react'
import * as mutations from "../../graphql/mutations"
import { GraphQLAPI, } from '@aws-amplify/api-graphql'

import { Typography } from '@material-ui/core'
import { moderationGroup, moderationTypes } from '../../constants/moderation'
import ThresholdsContext from '../../context/ThresholdsContext'
import { SET_MODERATION_THRESHOLDS } from '../../context/ThresholdsContextProvider'
import MultiRangeSlider from '../Slider'
import DisableButtonComp from '../DisableButton'
import { Title, SliderWrapper, CategoryBlock, ResetButton, ResetButtonWrapper } from './styled'
import SettingActionButtons from '../SettingActionButtons'

const ModerationForm = ({
  disableButtonClicked,
  setShowActionButtons,
  handleOpen,
  showActionButtons,
  setSnackbarMessage,
  handleRestoreDefaults
}) => {

  const [isSaving, setIsSaving] = useState()

  const [{ moderationThresholds }, dispatch] = useContext(ThresholdsContext)
  const alert = moderationThresholds[0]
  const action = moderationThresholds[1]

  const multipleDispatches = (moderationName, newValues) => {
    const { alertNewValue, actionNewValue} = newValues

    dispatch({
      type: SET_MODERATION_THRESHOLDS,
      moderationThresholds: [
        { ...alert, [moderationName]: alertNewValue},
        { ...action, [moderationName]: actionNewValue}
      ],
    });
  }

  const alertButtonClicked = (field) => {
    setShowActionButtons(true)
    if((action[field] <= 50) && (action[field] != 0) && (alert[field] == 0)) {
      multipleDispatches(field, {alertNewValue: "50", actionNewValue: "60"})
    } else {
      disableButtonClicked(moderationTypes.ALERT, alert[field], field)
    }
  }

  const actionButtonClicked = (field) => {
    setShowActionButtons(true)
    if(alert[field] >= 99 && alert[field] != 0 && action[field] == 0) {
      multipleDispatches(field, { alertNewValue: "80", actionNewValue: "99"})
    } else {
      disableButtonClicked(moderationTypes.ACTION, action[field], field)
    }
  }
  const saveSettings = (thresholds) => {
    GraphQLAPI.graphql({
      query: mutations.updateSettings,
      variables: { input: thresholds },
    });
  }

  async function handleSave(e) {
    e.preventDefault()
    setIsSaving(true)

    try {
      await Promise.all([
        saveSettings({ id: moderationTypes.ALERT, ...moderationThresholds[0] }),
        saveSettings({ id: moderationTypes.ACTION, ...moderationThresholds[1] }),
      ]);

      setSnackbarMessage("Settings updated successfully!")
      handleOpen(false)
    } catch (err) {
      setSnackbarMessage(err)
      console.log(`Error upating settings: ${err}`);
    }
    setIsSaving(false)
  }

  return (
    <form>
      <div style={{ width: '100%'}}>
        {moderationGroup.map(({ group, groupId, settings }) => {

          return (
            <CategoryBlock key={group} id={groupId}>
              <Title variant="h3">{group}</Title>

              {settings.map(({label, field}) => {
                return (
                  <div key={field}>
                    <Typography variant="h5" style={{ fontWeight: '500'}}>{label}</Typography>
                    <SliderWrapper
                      display="flex" alignItems="center"
                      padding='0.6rem 1rem'
                      borderRadius="0.8rem"
                      margin="1rem 0 2rem 0"
                    >
                      <DisableButtonComp
                        type={moderationTypes.ALERT}
                        isDisabled={alert[field] === "0"}
                        handleClick={() => alertButtonClicked(field)}
                      />
                      <MultiRangeSlider min={alert[field]} max={action[field]} field={field} setShowActionButtons={setShowActionButtons} />
                      <DisableButtonComp
                        type={moderationTypes.ACTION}
                        isDisabled={action[field] === "0"}
                        handleClick={() => actionButtonClicked(field)}
                      />
                    </SliderWrapper>
                  </div>
                )
              }
              )}
            </CategoryBlock>
          )
        }
        )}
    </div>
    <ResetButtonWrapper width="100%" display="flex" justifyContent="center">
      <ResetButton onClick={() => {
        setShowActionButtons(true)
        handleRestoreDefaults()
      }}>
        Restore defaults
      </ResetButton>
    </ResetButtonWrapper>
    <SettingActionButtons
      showActionButtons={showActionButtons}
      handleOpen={handleOpen}
      isSaving={isSaving}
      handleSave={handleSave}
    />
  </form>
  )
}

export default ModerationForm