let generatedData: {
  labels: string[];
  datasets: {label: string; backgroundColor: string[]; data: number[]}[];
}

export const getDonutChartData = (themes: ColorThemes) => {
  if (generatedData) {
    generatedData.datasets[0].backgroundColor = [themes.danger, themes.info, themes.primary]
  } else {
    generatedData = {
      labels: ['Italy', 'France', 'Switzerland'],
      datasets: [{
        label: 'Population (millions)',
        backgroundColor: [themes.danger, themes.info, themes.primary],
        data: [2478, 5267, 734],
      }],
    }
  }

  return generatedData
}
