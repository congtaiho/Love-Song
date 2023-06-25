import React from 'react'
import { createRoot } from 'react-dom/client'

import AppContainer from 'container/app-container'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<AppContainer />)
