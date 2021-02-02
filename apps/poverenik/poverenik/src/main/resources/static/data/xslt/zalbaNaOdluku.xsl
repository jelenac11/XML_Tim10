<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:zno="http://www.projekat.org/zalba_na_odluku"
    xmlns:common="http://www.projekat.org/common"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
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
                    width: 850px;
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
                    margin-top: -80pt;
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
                <div style="padding-left: 50pt;
                    margin: 0 auto;
                    margin-top: 20pt;
                    margin-bottom: 20pt;
                    background-color: white;
                    padding-right: 50pt;
                    padding-top: 60pt;
                    padding-bottom: 60pt;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    width: 850px;
                    position: sticky;
                    top: 25pt;">
                    <h4 style="font-family: 'Times New Roman';
                    font-size: 10pt;
                    text-align: center;
                    margin-top: 0pt !important;
                    margin-bottom: 0pt !important;"><b>ЖАЛБА  ПРОТИВ  ОДЛУКЕ ОРГАНА  ВЛАСТИ КОЈОМ ЈЕ</b></h4>
                    <h4 style="font-family: 'Times New Roman';
                    font-size: 10pt;
                    text-align: center;
                    margin-top: 0pt !important;
                    margin-bottom: 20pt !important;"><b><u>ОДБИЈЕН ИЛИ ОДБАЧЕН ЗАХТЕВ</u> ЗА ПРИСТУП ИНФОРМАЦИЈИ</b></h4>
                    <p style="font-family: 'Times New Roman';
                    font-size: 11pt;
                    margin-bottom: 0pt !important;"><b>Поверенику за информације од јавног значаја и заштиту података о личности</b></p>
                    <p style="font-family: 'Times New Roman';
                    font-size: 11pt;
                    margin-top: 0pt !important;
                    margin-bottom: 20pt !important;">Адреса за пошту: <xsl:value-of select="/zno:zalba_na_odluku/zno:adresa_poverenika/common:mesto"></xsl:value-of>, 
                    <xsl:value-of select="/zno:zalba_na_odluku/zno:adresa_poverenika/common:ulica"></xsl:value-of> бр. <xsl:value-of select="/zno:zalba_na_odluku/zno:adresa_poverenika/common:broj"></xsl:value-of></p>
                    <p style="font-family: 'Times New Roman';
                    font-size: 11pt;
                    text-align: center;"><strong>Ж А Л Б А</strong></p>
                    <div style="text-align: center;">(
                        <textarea rows="2" style="font-family: 'Times New Roman'; font-size: 11pt; width: 60%; margin-top: 10pt; text-align: center; border: none">
                            <xsl:if test='/zno:zalba_na_odluku/zno:zalilac[@xsi:type = "common:TFizicko_lice"]'> 
                                <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:ime, ' ')"></xsl:value-of><xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:prezime"></xsl:value-of>, <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:mesto"></xsl:value-of>
                            </xsl:if>
                            <xsl:if test='/zno:zalba_na_odluku/zno:zalilac[@xsi:type = "common:TPravno_lice"]'> 
                                <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:naziv"></xsl:value-of>, <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:ulica, ' ')"></xsl:value-of> <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:broj"></xsl:value-of>,  <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:mesto"></xsl:value-of>
                            </xsl:if>
                        </textarea>)
                    </div>
                    <p style="margin-top: 0pt;
                    margin-bottom: 0pt;
                    text-align: center;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">(Име, презиме, односно назив, адреса и седиште жалиоца)</p>
                    <p style="margin-top: 20pt;
                    margin-bottom: 0pt;
                    text-align: center;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">против решења-закључка</p>
                    <div style="text-align: center;">(
                        <span style="font-family: 'Times New Roman';
                    display: inline-block;
                    width: 50%;
                    margin-top: 20pt;
                    text-align: center;
                    font-size: 11pt;
                    border: none"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_resenju/zno:naziv_organa"></xsl:value-of></span>
                    )</div>
                    <p style="margin-top: 0pt;
                    margin-bottom: 3pt;
                    text-align: center;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">(назив органа који је донео одлуку)</p>
                    <p style="font-family: 'Times New Roman';
                    font-size: 11pt;
                    margin-top: 0pt;
                    margin-bottom: 15pt;">
                        <span>Број </span>
                        <span style="font-family: 'Times New Roman';
                    margin-left: 3pt;
                    display: inline-block;
                    width: 120px"><xsl:value-of select="/zno:zalba_na_odluku/@broj_resenja"></xsl:value-of></span>
                        <span>од </span>
                        <span style="font-family: 'Times New Roman';
                    margin-left: 3pt;
                    display: inline-block;
                    width: 100px"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_resenju/zno:godina"></xsl:value-of></span>
                        године.
                    </p>
                    <p style="margin-top: 0pt;
                    margin-bottom: 0pt;
                    text-indent: 36pt;
                    text-align: justify;
                    font-size: 11pt;">
                        <span style="font-family: 'Times New Roman';">Наведеном одлуком органа власти (решењем, закључком, обавештењем у писаној форми са елементима одлуке), супротно закону, одбијен-одбачен је мој захтев који сам поднео/ла-упутио/ла дана 
                            <xsl:variable name="datum" select="substring-after(/zno:zalba_na_odluku/zno:datum_zahteva, '-')"/>
                            <span style="font-family: 'Times New Roman';
                    margin-left: 3pt;
                    display: inline-block;
                    width: 200px"><xsl:value-of select="substring(/zno:zalba_na_odluku/zno:datum_zahteva, 9, 9)"></xsl:value-of>.<xsl:value-of select="substring-before($datum, '-')"></xsl:value-of>.<xsl:value-of select="substring-before(/zno:zalba_na_odluku/zno:datum_zahteva, '-')"></xsl:value-of>.</span>
                            године и тако ми ускраћено-онемогућено остваривање уставног и законског права на слободан приступ информацијама од јавног значаја. Oдлуку побијам у целости, односно у делу којим 
                            <textarea rows="3" style="font-family: 'Times New Roman'; font-size: 11pt; width: 100%; border: none; font-size: 11pt;">
                                <xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:opis"></xsl:value-of>
                            </textarea><br></br> 
                            јер није заснована на Закону о слободном приступу информацијама од јавног значаја.
                        </span>
                    </p>
                    <p style="margin-top: 0pt !important;
                    margin-bottom: 0pt !important;
                    text-indent: 36pt;
                    text-align: justify;
                    font-size: 11pt;">
                        <span style="font-family: 'Times New Roman';">На основу изнетих разлога, предлажем да Повереник уважи моју жалбу, поништи одлука првостепеног органа и омогући ми приступ траженој/им информацији/ма.</span>
                    </p>
                    <p style=" margin-top: 0pt !important;
                    margin-bottom: 0pt !important;
                    text-indent: 36pt;
                    text-align: justify;
                    font-size: 11pt;">
                        <span style="font-family: 'Times New Roman';">Жалбу подносим благовремено, у законском року утврђеном у члану 22. ст. 1. Закона о слободном приступу информацијама од јавног значаја.</span>
                    </p>
                    <div style="display: block;
                    text-align: right;">
                        <span style="width: 200px;
                    display: inline-block;
                    margin-top: 20pt"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:naziv"></xsl:value-of><xsl:value-of select="concat(/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:ime, ' ')"></xsl:value-of><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:prezime"></xsl:value-of></span>
                    </div>
                    <div style="display: block;
                    text-align: right;">
                        <p style="margin-top: 0pt;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">Подносилац жалбе / Име и презиме</p>
                    </div>
                    <div style="display: block;
                    text-align: right;
                    width: 100%;">
                        <span style="width: 60%;
                    display: inline-block;"><xsl:value-of select="concat(/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:mesto"></xsl:value-of></span>
                    </div>
                    <div style="display: block;
                    text-align: right;
                    width: 100%;">
                        <p style="margin-top: 0pt;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">адресa</p>
                    </div>
                    <div style="display: block;
                    text-align: right;
                    width: 100%;">
                        <span style="width: 60%;
                    display: inline-block;"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:drugi_podaci_za_kontakt"></xsl:value-of></span>
                    </div>
                    <div style="display: block;
                    text-align: right;
                    width: 100%;">
                        <p style="margin-top: 0pt;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">други подаци за контакт</p>
                    </div>
                    <div style="display: block;
                    text-align: right;
                    width: 100%;">
                        <span style="width: 60%;
                    display: inline-block;"> </span>
                    </div>
                    <div style="display: block;
                    text-align: right;
                    width: 100%;">
                        <p style="margin-top: 0pt;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">потпис</p>
                    </div>
                    <p style="text-indent: 10pt;
                    margin-top: -80pt;
                    margin-bottom: 30pt;
                    text-align: justify;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">У
                        <span style="width: 200px;
                    margin-left: 5px;
                    display: inline-block;"><xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:mesto"></xsl:value-of></span>,
                    </p>
                    <p style="text-indent: 10pt;
                    margin-top: -20pt;
                    margin-bottom: 30pt;
                    text-align: justify;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">дана
                        <span style="width: 50%;
                    margin-left: 2px;
                    display: inline-block;">
                    <xsl:variable name="currenttime" select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:datum_podnosenja" as="xs:date" />
						<xsl:value-of
							select="format-date($currenttime,'[D]')" />
						<xsl:text>.</xsl:text>
						<xsl:if
							test="number(format-date($currenttime,'[M]')) gt 9">
							<xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if>
						<xsl:if
							test="number(format-date($currenttime,'[M]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:value-of
							select="format-date($currenttime,'[Y]')" />
							. године</span>
                    </p>
                    <p style="text-indent: 10pt;
                    margin-bottom: 0pt !important;
                    padding-left: 8px;
                    font-size: 11pt;
                    font-family: 'Times New Roman';"><strong>Напомена:</strong></p>
                    <ul type="disc">
                        <li style="margin-left: 10pt;
                    text-align: justify;
                    padding-left: 8pt;
                    font-family: serif;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">У жалби се мора навести одлука која се побија (решење, закључак, обавештење), назив органа који је одлуку донео, као и број и датум одлуке. Довољно је да жалилац наведе у жалби у ком погледу је незадовољан одлуком, с тим да жалбу не мора посебно образложити. Ако жалбу изјављује на овом обрасцу, додатно образложење може посебно приложити.</li>
                        <li style="margin-left: 10pt;
                    text-align: justify;
                    padding-left: 8pt;
                    font-family: serif;
                    font-size: 11pt;
                    font-family: 'Times New Roman';">Уз жалбу обавезно приложити копију поднетог захтева и доказ о његовој предаји-упућивању органу као и копију одлуке органа која се оспорава жалбом.</li>
                    </ul>
                </div>
            </body>
        </html>					 
    </xsl:template>
</xsl:stylesheet>