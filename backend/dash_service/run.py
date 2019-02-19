from alchemist.visualization.dash_model.componets.data_analyser import DataAnalyser

if __name__ == '__main__':
    file = 'data/difraction_index_nd300_glasses.csv'
    # file = 'data/tg_temp_liq_nd300_oxides.csv'
    control = DataAnalyser(file=file, target='ND300', name=__name__)
