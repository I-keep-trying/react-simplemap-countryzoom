import React, { useState } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'
import { Spring, config } from 'react-spring'
import chroma from 'chroma-js'

const geoPaths = ['/world.json', '/ch.json']

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const colorScale = chroma.brewer.Oranges.slice(1)
// const scl = chroma.scale(["#FFF", "#FF5419", "#000"]).mode("lch").colors(8);

const colors = Array(180)
  .fill()
  .map((d) => colorScale[getRandomInt(0, colorScale.length - 1)])

const App = () => {
  const [state, setState] = useState({
    detail: false,
    paths: geoPaths[0],
    center: [0, 0],
    zoom: 1,
  })

  const switchPaths = () => {
    const { detail } = state
    setState({
      paths: detail ? geoPaths[0] : geoPaths[1],
      center: detail ? [0, 0] : [8, 47],
      zoom: detail ? 1 : 60,
      detail: !detail,
    })
  }
  return (
    <div>
      {'Click on the map!'}
      <Spring from={{ zoom: 1 }} to={{ zoom: state.zoom }} config={config.slow}>
        {(styles) => (
          <ComposableMap style={{ width: '100%', height: 'auto' }}>
            <ZoomableGroup center={state.center} zoom={styles.zoom}>
              <Geographies geography={state.paths} disableOptimization>
                {(geos, proj) => {
                  console.log('geos',geos)
                return (
                  geos.map((geo, i) => (
                    <Geography
                      key={(geo.properties.ISO_A3 || geo.properties.GID_1) + i}
                      cacheId={
                        (geo.properties.ISO_A3 || geo.properties.GID_1) + i
                      }
                      geography={geo}
                      projection={proj}
                      onClick={switchPaths}
                      style={{
                        default: {
                          fill: colors[i],
                          outline: 'none',
                        },
                        hover: {
                          outline: 'none',
                        },
                        pressed: {
                          outline: 'none',
                        },
                      }}
                    />
                  ))
               ) }}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </Spring>
    </div>
  )
}

export default App
