/* eslint eqeqeq: "off" */
/* eslint react-hooks/exhaustive-deps: "off" */
import React, {useContext, useState, useEffect, useRef } from 'react'
import { Backdrop, Button, CircularProgress, Fade, Typography, useMediaQuery } from '@material-ui/core'
import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql'
import * as queries from '../../graphql/queries'
import { SET_INITIAL_MODERATION_THRESHOLDS, SET_MODERATION_THRESHOLDS } from '../../context/ThresholdsContextProvider'
import ThresholdsContext from '../../context/ThresholdsContext'

import { moderationGroup, moderationTypes } from '../../constants/moderation'
import ModerationForm from '../ModerationForm'
import ModerationTags from '../ModerationTags'

import closeIcon from '../../assets/close.svg'
import { ModalInner, ModalOuter, CloseButtonIcon } from './styled'

export default function SettingsModal({ open, handleOpen, setSnackbarMessage }) {

  const [{ moderationThresholds }, dispatch] = useContext(ThresholdsContext)
  const modalRef = useRef()
  const [isScrolledTop, setModalScrolledTop] = useState(true)
  const [tagGroups, setTagGroups] = useState(null)
  const [showActionButtons, setShowActionButtons] = useState(false) 
  const [loading, setIsLoading] = useState(false)
  const matches = useMediaQuery('(min-width:640px)');

  useEffect(() => {
    async function fetchThresholds() {
      setIsLoading(true)
      try {
        const { data } = (await GraphQLAPI.graphql(
          graphqlOperation(queries.listSettings),
        ))

        dispatch({
          type: SET_INITIAL_MODERATION_THRESHOLDS,
          moderationThresholds: data.listSettingss.items
        })

      } catch (err) {
        console.log("something went wrong retrieving settings data", err)
      }

      setIsLoading(false)
    }
    if(!!open) {
      setShowActionButtons(false)
      fetchThresholds();
    }
  }, [open]);


  useEffect(() => {
    const group = moderationGroup.map(({group, groupId}) => (
      {groupId, group}
    ))
    setTagGroups(group)
  }, [])

  const setModerationThresholdFunc = (type, moderationName, newValue) => {
    const isAlert = type === moderationTypes.ALERT

    const alertValues = moderationThresholds[0]
    const actionValues = moderationThresholds[1]

    const newModerationThresholds = [
      { ...alertValues, [moderationName]: isAlert ? newValue : alertValues[moderationName]},
      { ...actionValues, [moderationName]: isAlert ? actionValues[moderationName] : newValue}
    ]
    dispatch({
      type: SET_MODERATION_THRESHOLDS,
      moderationThresholds: newModerationThresholds,
    });
  }

  const handleDisableButton = (type, currentValue, field) => {
    if(currentValue == 0) {
      setModerationThresholdFunc(type, field, type === moderationTypes.ALERT ? "50" : "99")
    } else {
      setModerationThresholdFunc(type, field, "0")
    }
  }

  const handleScroll = () => {
    const offsetTop = modalRef.current.scrollTop
    if (offsetTop < 700) {
      setModalScrolledTop(true)
    } else {
      setModalScrolledTop(false)
    }
  }

  const handleRestoreDefaults = () => {
    setShowActionButtons(true)
    let newAlertValues = moderationThresholds[0]
    Object.keys(newAlertValues).forEach(v => {
      if(v === "id" || newAlertValues[v] === null) {
        return newAlertValues[v]
      }
      return newAlertValues[v] = "50"
    })

    let newActionValues = moderationThresholds[1]
    Object.keys(newActionValues).forEach(v => {
      if(v === "id" || newActionValues[v] === null) {
        return newActionValues[v]
      }
      return newActionValues[v] = "99"
    })

    dispatch({
      type: SET_MODERATION_THRESHOLDS,
      moderationThresholds: [
        newAlertValues,
        newActionValues
      ],
    });
  }

  return (
    <ModalOuter
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => handleOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalInner
          ref={modalRef}
          onScroll={handleScroll}
        >
          <CloseButtonIcon
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
            position="fixed"
            matches={matches ? 1 : 0}
          >
            <Button onClick={() => handleOpen(false)} style={{ padding: '1.6rem 0', minWidth: '4.6rem' }}><img src={closeIcon} alt="Close modal" /></Button>
          </CloseButtonIcon>
          <Typography variant="h2" id="transition-modal-title">Settings</Typography>
          {loading ? <CircularProgress />
          : (
            <>
              <ModerationTags
                tagGroups={tagGroups}
                modalRef={modalRef}
                isScrolledTop={isScrolledTop}
              />
              <ModerationForm
                disableButtonClicked={handleDisableButton}
                setShowActionButtons={setShowActionButtons}
                handleOpen={handleOpen}
                showActionButtons={showActionButtons}
                setSnackbarMessage={setSnackbarMessage}
                handleRestoreDefaults={handleRestoreDefaults }
              />
            </>
          )}
        </ModalInner>
      </Fade>
    </ModalOuter>
  );
}