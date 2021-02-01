export const zalbaCutanjeXSLT = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:zc="http://www.projekat.org/zalba_cutanja"
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
                        width: 850px;
                        position: sticky;
                        top: 25pt;
                    }
                    
                    .c2 {
                        font-family: 'Times New Roman';
                        font-size: 10pt;
                        text-align: center;
                        margin: 0 !important;
                    }
                    
                    .c3 {
                        font-family: 'Times New Roman';
                        font-size: 10pt;
                        text-align: center;
                        margin: 0 !important;
                    }
                    
                    .c4 {
                        font-family: 'Times New Roman';
                        font-size: 11pt;
                        margin-top: 20pt !important;
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
                        margin-top: -10pt;
                    }
                    
                    .c7 {
                        text-align: center;
                    }
                    
                    .c8 {
                        font-family: 'Times New Roman';
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
                        width: 100%;
                        border: none;
                        font-size: 11pt;
                    }
                    
                    .c20 {
                        margin-top: 0pt !important;
                        margin-bottom: 0pt !important;
                        text-align: justify;
                        font-size: 11pt;
                        text-indent: 30pt !important;
                    }
                    
                    .c21 {
                        margin-top: 0pt !important;
                        margin-bottom: 0pt !important;
                        text-align: justify;
                        font-size: 11pt;
                        text-indent: 30pt !important;
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
                        width: 50%;
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
                        margin-bottom: 5pt;
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
                    <h4 class="c2"><b>ЖАЛБА КАДА ОРГАН ВЛАСТИ <u>НИЈЕ ПОСТУПИО/ није поступио у целости/ ПО ЗАХТЕВУ</u></b></h4>
                    <h4 class="c3"><b>ТРАЖИОЦА У ЗАКОНСКОМ  РОКУ  (ЋУТАЊЕ УПРАВЕ)</b></h4>
                    <p class="c4"><b>Поверенику за информације од јавног значаја и заштиту података о личности</b></p>
                    <p class="c5">Адреса за пошту: <xsl:value-of select="/zc:zalba_na_cutanje/zc:adresa_poverenika/common:mesto"></xsl:value-of>, 
                    <xsl:value-of select="/zc:zalba_na_cutanje/zc:adresa_poverenika/common:ulica"></xsl:value-of> бр. <xsl:value-of select="/zc:zalba_na_cutanje/zc:adresa_poverenika/common:broj"></xsl:value-of></p>
                    <p class="c5">У складу са чланом 22. Закона о слободном приступу информацијама од јавног значаја подносим:</p>
                    <p class="c6"><strong>Ж А Л Б У</strong></p>
                    <p class="c9" style="margin-top: -10pt">против</p>
                    <div class="c7">
                        <textarea rows="2" class="c8">
                            <xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:naziv"></xsl:value-of>, <xsl:value-of select="concat(/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:mesto"></xsl:value-of>
                        </textarea>
                    </div>
                    <p class="c9">( навести назив органа )</p>
                    <p class="c9" style="margin-top: 15pt">због тога што орган власти:</p>
                    <p class="c9">
                        <xsl:if test='/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:razlog_zalbe = "није поступио"'>
                            <b><u>није поступио</u> / није поступио у целости / у законском року</b>
                        </xsl:if>
                        <xsl:if test='/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:razlog_zalbe = "није поступио у целости"'>
                            <b>није поступио/<u> није поступио у целости</u>/ у законском року</b>
                        </xsl:if>
                        <xsl:if test='/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:razlog_zalbe = "није поступио у законском року"'>
                            <b>није поступио / није поступио у целости /<u> у законском року</u></b>
                        </xsl:if>
                        <xsl:if test='/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:razlog_zalbe = ""'>
                            <b>није поступио / није поступио у целости / у законском року</b>
                        </xsl:if>
                    </p>
                    <p class="c9" style="margin-bottom: 15pt">(подвући  због чега се изјављује жалба)</p>
                    <p class="c16">
                        <span class="c17">по мом захтеву за слободан приступ информацијама од јавног значаја који сам поднео том органу дана 
                            <xsl:variable name="datum" select="substring-after(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, '-')"/>
                            <span class="c18"><xsl:value-of select="substring(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, 9, 9)"></xsl:value-of>.<xsl:value-of select="substring-before($datum, '-')"></xsl:value-of>.<xsl:value-of select="substring-before(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, '-')"></xsl:value-of>.</span>
                            године, а којим сам тражио/ла да ми се у складу са Законом о слободном приступу информацијама од јавног значаја омогући увид- копија документа који садржи информације о /у вези са: <br></br>
                            <textarea rows="3" class="c19">
                                <xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:informacije"></xsl:value-of>
                            </textarea><br></br> 
                        </span>
                    </p>
                    <p class="c9" style="margin-bottom: 10pt">(навести податке о захтеву и информацији/ама)</p>
                    <p class="c20">
                        <span class="c17">На основу изнетог, предлажем да Повереник уважи моју жалбу и омогући ми приступ траженој/им информацији/ма.</span>
                    </p>
                    <p class="c20">
                        <span class="c17">Као доказ, уз жалбу достављам копију захтева са доказом о предаји органу власти.</span>
                    </p>
                    <p class="c21">
                        <span class="c17"><b>Напомена:</b> Код жалбе  због непоступању по захтеву у целости, треба приложити и добијени одговор органа власти.</span>
                    </p>
                    <div class="c22">
                        <span class="c23"><xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:ime"></xsl:value-of></span> <span style="padding-left:4px"><xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:prezime"></xsl:value-of> </span>
                    </div>
                    <div class="c22">
                        <p class="c24">Подносилац жалбе / Име и презиме</p>
                    </div>
                    <div class="c25">
                        <span class="c26"> <xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:ulica"></xsl:value-of> <span style="padding-left:4px"><xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:broj"></xsl:value-of></span>, <xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:mesto"></xsl:value-of> </span>
                    </div>
                    <div class="c25">
                        <p class="c24">адресa</p>
                    </div>
                    <div class="c25">
                        <span class="c26"><xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:drugi_podaci_za_kontakt"></xsl:value-of> </span>
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
                        <span class="c28"> <xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:mesto"></xsl:value-of> </span>, <span padding-left="4px">дана</span>
                        <span class="c30">${("0" + new Date().getDate()).slice(-2) + '.' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '.' + new Date().getFullYear()}. године </span>
                    </p>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
`