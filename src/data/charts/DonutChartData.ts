let generatedData: {
  labels: string[];
  datasets: { label: string; backgroundColor: string[]; data: number[] }[];
};

export const getDonutChartData = (
  themes: ColorThemes,
  issuersData: any[],
  t: any
) => {
  const countriesAndIssuers: any = {};
  const data: number[] = [];
  const colors = [];

  const availableColors = [
    themes.primary,
    themes.secondary,
    themes.success,
    themes.info,
    themes.warning,
    themes.danger,
    themes.background,
    themes.divider,
    themes.gray,
    themes.dark
  ];
  const labels = issuersData.map(e => {
    const label: string = t("countries." + e.Country);
    if (!countriesAndIssuers[label]) {
      countriesAndIssuers[label] = 1;
    } else {
      countriesAndIssuers[label] = countriesAndIssuers[label] + 1;
    }
    return label;
  });
  const totalColors = availableColors.length;
  for (let i = 0; i < labels.length; i++) {
    colors.push(availableColors[i % totalColors]);
  }
  for (let i = 0; i < labels.length; i++) {
    data.push(countriesAndIssuers[labels[i]]);
  }

  generatedData = {
    labels: labels,
    datasets: [
      {
        label: "",
        backgroundColor: colors,
        data: data
      }
    ]
  };

  return generatedData;
};
