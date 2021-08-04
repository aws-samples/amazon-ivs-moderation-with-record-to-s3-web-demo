/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@material-ui/core"
import { useEffect, useRef } from "react"
import { ModerationTag } from './styled'

const ModerationTags = ({ tagGroups, isScrolledTop, modalRef }) => {
  const tagRef = useRef()

  const clickHandler = (e, groupId) => {
    e.preventDefault()
    const target = document.getElementById(groupId);
    modalRef.current.scroll({ top: target.offsetTop - 46, behavior: 'smooth' })
  }

  useEffect(() => {
    if(isScrolledTop) {
      tagRef.current.focus()
    }
  }, [isScrolledTop])

  return (
    <Box mt="3rem" mb="3.4rem" display="flex" flexWrap="wrap">
      {tagGroups.map((tagGroup, index) => {
        return (
          <ModerationTag
            key={tagGroup.groupId}
            ref={index === 0 ? tagRef : null}
            onClick={(e) => clickHandler(e, tagGroup.groupId)}
            href={`${tagGroup.groupId}`}
          >
            {tagGroup.group}
          </ModerationTag>
        )
      })}
    </Box>
  )
}

export default ModerationTags