export const zalbaNaOdlukuXSLT = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:zno="http://www.projekat.org/zalba_na_odluku"
    xmlns:common="http://www.projekat.org/common"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    version="2.0">
    <xsl:template match="/">					    
        <html>
            <head>
                <style>
                    body {
                        background-color: grey;
                    }
                
                 .c1 {
                    padding-left: 50pt;
                    margin: 0 auto;
                    margin-top: 20pt;
                    margin-bottom: 20pt;
                    background-color: white;
                    padding-right: 50pt;
                    padding-top: 60pt;
                    padding-bottom: 60pt;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    width: 90%;
                    position: sticky;
                    top: 25pt;
                 }
                
                 .c2 {
                    font-family: 'Times New Roman';
                    font-size: 10pt;
                    text-align: center;
                    margin-top: 0pt !important;
                    margin-bottom: 0pt !important;
                 }
                
                 .c3 {
                    font-family: 'Times New Roman';
                    font-size: 10pt;
                    text-align: center;
                    margin-top: 0pt !important;
                    margin-bottom: 20pt !important;
                 }
                
                 .c4 {
                    font-family: 'Times New Roman';
                    font-size: 11pt;
                    margin-bottom: 0pt !important;
                 }
                
                 .c5 {
                    font-family: 'Times New Roman';
                    font-size: 11pt;
                    margin-top: 0pt !important;
                    margin-bottom: 20pt !important;
                 }
                
                 .c6 {
                    font-family: 'Times New Roman';
                    font-size: 11pt;
                    text-align: center;
                 }
                
                 .c7 {
                    text-align: center;
                 }
                
                 .c8 {
                    font-family: 'Times New Roman';
                    font-size: 11pt;
                    width: 60%;
                    margin-top: 10pt;
                    text-align: center;
                    border: none
                 }
                
                 .c9 {
                    margin-top: 0pt;
                    margin-bottom: 0pt;
                    text-align: center;
                    font-size: 11pt;
                    font-family: 'Times New Roman';
                 }
                
                 .c10 {
                    margin-top: 20pt;
                    margin-bottom: 0pt;
                    text-align: center;
                    font-size: 11pt;
                    font-family: 'Times New Roman';
                 }
                
                 .c11 {
                    font-family: 'Times New Roman';
                    display: inline-block;
                    width: 50%;
                    margin-top: 20pt;
                    text-align: center;
                    font-size: 11pt;
                    border: none
                 }
                
                 .c12 {
                    margin-top: 0pt;
                    margin-bottom: 3pt;
                    text-align: center;
                    font-size: 11pt;
                    font-family: 'Times New Roman';
                 }
                
                 .c13 {
                    font-family: 'Times New Roman';
                    font-size: 11pt;
                    margin-top: 0pt;
                    margin-bottom: 15pt;
                 }
                
                 .c14 {
                    font-family: 'Times New Roman';
                    margin-left: 3pt;
                    display: inline-block;
                    width: 120px
                 }
                
                 .c15 {
                    font-family: 'Times New Roman';
                    margin-left: 3pt;
                    display: inline-block;
                    width: 100px
                 }
                
                 .c16 {
                    margin-top: 0pt;
                    margin-bottom: 0pt;
                    text-indent: 36pt;
                    text-align: justify;
                    font-size: 11pt;
                 }
                
                 .c17 {
                    font-family: 'Times New Roman';
                 }
                
                 .c18 {
                    font-family: 'Times New Roman';
                    margin-left: 3pt;
                    display: inline-block;
                    width: 200px
                 }
                
                 .c19 {
                    font-family: 'Times New Roman';
                    font-size: 11pt;
                    width: 100%;
                    border: none;
                    font-size: 11pt;
                 }
                
                 .c20 {
                    margin-top: 0pt !important;
                    margin-bottom: 0pt !important;
                    text-indent: 36pt;
                    text-align: justify;
                    font-size: 11pt;
                 }
                
                 .c21 {
                    margin-top: 0pt !important;
                    margin-bottom: 0pt !important;
                    text-indent: 36pt;
                    text-align: justify;
                    font-size: 11pt;
                 }
                
                 .c22 {
                    display: block;
                    text-align: right;
                 }
                
                 .c23 {
                    width: 200px;
                    display: inline-block;
                    margin-top: 20pt
                 }
                
                 .c24 {
                    margin-top: 0pt;
                    font-size: 11pt;
                    font-family: 'Times New Roman';
                 }
                
                 .c25 {
                    display: block;
                    text-align: right;
                    width: 100%;
                 }
                
                 .c26 {
                    width: 60%;
                    display: inline-block;
                 }
                
                 .c27 {
                    text-indent: 10pt;
                    margin-top: -40pt;
                    margin-bottom: 30pt;
                    text-align: justify;
                    font-size: 11pt;
                    font-family: 'Times New Roman';
                 }
                
                 .c28 {
                    width: 200px;
                    margin-left: 5px;
                    display: inline-block;
                 }
                
                 .c29 {
                    text-indent: 10pt;
                    margin-top: -20pt;
                    margin-bottom: 30pt;
                    text-align: justify;
                    font-size: 11pt;
                    font-family: 'Times New Roman';
                 }
                
                 .c30 {
                    width: 50%;
                    margin-left: 2px;
                    display: inline-block;
                 }
                
                 .c31 {
                    width: 20px;
                    margin-left: 2px;
                    display: inline-block;
                 }
                
                 .c32 {
                    text-indent: 10pt;
                    margin-bottom: 0pt !important;
                    padding-left: 8px;
                    font-size: 11pt;
                    font-family: 'Times New Roman';
                 }
                
                 .c33 {
                    margin-left: 10pt;
                    text-align: justify;
                    padding-left: 8pt;
                    font-family: serif;
                    font-size: 11pt;
                    font-family: 'Times New Roman';
                 }
                </style>
            </head>
            <body>
                <div class="c1">
                    <h4 class="c2"><b>ЖАЛБА  ПРОТИВ  ОДЛУКЕ ОРГАНА  ВЛАСТИ КОЈОМ ЈЕ</b></h4>
                    <h4 class="c3"><b><u>ОДБИЈЕН ИЛИ ОДБАЧЕН ЗАХТЕВ</u> ЗА ПРИСТУП ИНФОРМАЦИЈИ</b></h4>
                    <p class="c4"><b>Поверенику за информације од јавног значаја и заштиту података о личности</b></p>
                    <p class="c5">Адреса за пошту: <xsl:value-of select="/zno:zalba_na_odluku/zno:adresa_poverenika/common:mesto"></xsl:value-of>, 
                    <xsl:value-of select="/zno:zalba_na_odluku/zno:adresa_poverenika/common:ulica"></xsl:value-of> бр. <xsl:value-of select="/zno:zalba_na_odluku/zno:adresa_poverenika/common:broj"></xsl:value-of></p>
                    <p class="c6"><strong>Ж А Л Б А</strong></p>
                    <div class="c7">(
                        <textarea rows="2" class="c8">
                            <xsl:if test='/zno:zalba_na_odluku/zno:zalilac[@xsi:type = "common:TFizicko_lice"]'> 
                                <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:ime, ' ')"></xsl:value-of><xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:prezime"></xsl:value-of>, <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:mesto"></xsl:value-of>
                            </xsl:if>
                            <xsl:if test='/zno:zalba_na_odluku/zno:zalilac[@xsi:type = "common:TPravno_lice"]'> 
                                <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:naziv"></xsl:value-of>, <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:ulica, ' ')"></xsl:value-of> <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:broj"></xsl:value-of>,  <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:mesto"></xsl:value-of>
                            </xsl:if>
                        </textarea>)
                    </div>
                    <p class="c9">(Име, презиме, односно назив, адреса и седиште жалиоца)</p>
                    <p class="c10">против решења-закључка</p>
                    <div class="c7">(
                        <span class="c11"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_resenju/zno:naziv_organa"></xsl:value-of></span>
                    )</div>
                    <p class="c12">(назив органа који је донео одлуку)</p>
                    <p class="c13">
                        <span>Број </span>
                        <span class="c14"><xsl:value-of select="/zno:zalba_na_odluku/@broj_resenja"></xsl:value-of></span>
                        <span>од </span>
                        <span class="c15"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_resenju/zno:godina"></xsl:value-of></span>
                        године.
                    </p>
                    <p class="c16">
                        <span class="c17">Наведеном одлуком органа власти (решењем, закључком, обавештењем у писаној форми са елементима одлуке), супротно закону, одбијен-одбачен је мој захтев који сам поднео/ла-упутио/ла дана 
                            <xsl:variable name="datum" select="substring-after(/zno:zalba_na_odluku/zno:datum_zahteva, '-')"/>
                            <span class="c18"><xsl:value-of select="substring(/zno:zalba_na_odluku/zno:datum_zahteva, 9, 9)"></xsl:value-of>.<xsl:value-of select="substring-before($datum, '-')"></xsl:value-of>.<xsl:value-of select="substring-before(/zno:zalba_na_odluku/zno:datum_zahteva, '-')"></xsl:value-of>.</span>
                            године и тако ми ускраћено-онемогућено остваривање уставног и законског права на слободан приступ информацијама од јавног значаја. Oдлуку побијам у целости, односно у делу којим <br></br>
                            <textarea rows="3" class="c19">
                                <xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:opis"></xsl:value-of>
                            </textarea><br></br> 
                            јер није заснована на Закону о слободном приступу информацијама од јавног значаја.
                        </span>
                    </p>
                    <p class="c20">
                        <span class="c17">На основу изнетих разлога, предлажем да Повереник уважи моју жалбу, поништи одлука првостепеног органа и омогући ми приступ траженој/им информацији/ма.</span>
                    </p>
                    <p class="c21">
                        <span class="c17">Жалбу подносим благовремено, у законском року утврђеном у члану 22. ст. 1. Закона о слободном приступу информацијама од јавног значаја.</span>
                    </p>
                    <div class="c22">
                        <span class="c23"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:ime"></xsl:value-of></span> <span style="padding-left:4px"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:prezime"></xsl:value-of></span>
                    </div>
                    <div class="c22">
                        <p class="c24">Подносилац жалбе / Име и презиме</p>
                    </div>
                    <div class="c25">
                        <span class="c26"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:ulica"></xsl:value-of> <span style="padding-left:4px"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:broj"></xsl:value-of></span>, <xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:mesto"></xsl:value-of></span>
                    </div>
                    <div class="c25">
                        <p class="c24">адресa</p>
                    </div>
                    <div class="c25">
                        <span class="c26"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:drugi_podaci_za_kontakt"></xsl:value-of></span>
                    </div>
                    <div class="c25">
                        <p class="c24">други подаци за контакт</p>
                    </div>
                    <div class="c25">
                        <span class="c26"> </span>
                    </div>
                    <div class="c25">
                        <p class="c24">потпис</p>
                    </div>
                    <p class="c27">У
                        <span class="c28"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:mesto"></xsl:value-of></span>,
                    </p>
                    <p class="c29">дана
                        <span class="c30">${("0" + new Date().getDate()).slice(-2) + '.' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '.' + new Date().getFullYear()}. године</span>
                    </p>
                    <p class="32"><strong>Напомена:</strong></p>
                    <ul type="disc">
                        <li class="c33">У жалби се мора навести одлука која се побија (решење, закључак, обавештење), назив органа који је одлуку донео, као и број и датум одлуке. Довољно је да жалилац наведе у жалби у ком погледу је незадовољан одлуком, с тим да жалбу не мора посебно образложити. Ако жалбу изјављује на овом обрасцу, додатно образложење може посебно приложити.</li>
                        <li class="c33">Уз жалбу обавезно приложити копију поднетог захтева и доказ о његовој предаји-упућивању органу као и копију одлуке органа која се оспорава жалбом.</li>
                    </ul>
                </div>
            </body>
        </html>					 
    </xsl:template>
</xsl:stylesheet>
`