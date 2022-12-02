import { Transition } from "framer-motion"
import { Entry } from "../../types"

let saveTimer: number | ReturnType<typeof setTimeout>
const DEBOUNCE_TIME_IN_MS = 1000

export const debounce = (callback: () => void) => {
  if (saveTimer) {
    clearTimeout(saveTimer)
  }
  saveTimer = setTimeout(callback, DEBOUNCE_TIME_IN_MS)
}

const INITIAL_EDITOR_JSON = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
}

export const getStringifiedEntry = ({
  content,
  title,
}: Pick<Entry, "content" | "title">) =>
  JSON.stringify(content ?? INITIAL_EDITOR_JSON) + title

export const EDIT_MODE_TRANSITION: Transition = {
  type: "tween",
  ease: "easeInOut",
}
