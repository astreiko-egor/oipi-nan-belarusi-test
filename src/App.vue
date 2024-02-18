<template>
  <div class="q-pa-xl" style="max-height: 100vh">
    <div v-show="isLoaded" class="q-mb-md q-gutter-xs">
      <q-btn v-for="button in buttons" :key="button.tool" :color="activeTool === button.tool ? 'primary' : 'secondary'"
        :icon="button.icon" @click="onSetTool(button.tool)" />
    </div>
    <q-file outlined v-model="model" class="q-mb-md" @update:model-value="loadTextFromFile">
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
      <template v-if="model" v-slot:append>
        <q-icon name="close" @click.stop.prevent="onClearInputAndDwv" class="cursor-pointer" />
      </template>
    </q-file>
    <div id="viewing" class="viewing"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { App, AppOptions, ViewConfig, ToolConfig, decoderScripts } from 'dwv'

decoderScripts.jpeg2000 = 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js'
decoderScripts['jpeg-lossless'] = 'assets/dwv/decoders/rii-mango/decode-jpegloss.js'
decoderScripts['jpeg-baseline'] = 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js'
decoderScripts.rle = 'assets/dwv/decoders/dwv/decode-rle.js'

const model = ref(null)
const dwvApp = new App()
const tools = {
  Scroll: new ToolConfig(),
  ZoomAndPan: new ToolConfig(),
  WindowLevel: new ToolConfig(),
  Draw: new ToolConfig(['Ruler'])
}

const activeTool = ref('Scroll')

const isLoaded = ref(false)

const buttons = [
  {
    tool: 'Scroll',
    icon: 'swipe'
  },
  {
    tool: 'ZoomAndPan',
    icon: 'zoom_in'
  },
  {
    tool: 'WindowLevel',
    icon: 'invert_colors'
  },
  {
    tool: 'Draw',
    icon: 'straighten'
  }
]

const loadTextFromFile = (e: any) => {
  dwvApp.loadFiles([e])
}

const onSetTool = (tool: string) => {
  dwvApp.setTool(tool)
  if (activeTool.value === tool && tool === 'ZoomAndPan') {
    dwvApp.resetZoom()
  }
  activeTool.value = tool
  if (tool === 'Draw') {
    dwvApp.setToolFeatures({ shapeName: 'Ruler' })
  }
}

const endOfLoading = () => {
  isLoaded.value = true
}

const onClearInputAndDwv = () => {
  model.value = null
  dwvApp.reset()
}

onMounted(async () => {
  dwvApp.addEventListener('loadstart', endOfLoading)

  const viewConfig0 = new ViewConfig('viewing')
  const viewConfigs = { '*': [viewConfig0] }
  const options = new AppOptions(viewConfigs)
  options.tools = tools
  dwvApp.init(options)
  dwvApp.setTool('Scroll')
})

onBeforeUnmount(() => {
  dwvApp.removeEventListener('loadstart', endOfLoading)
})
</script>
