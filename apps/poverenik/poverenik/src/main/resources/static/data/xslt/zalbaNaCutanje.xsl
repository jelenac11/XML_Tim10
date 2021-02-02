<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:zc="http://www.projekat.org/zalba_cutanja"
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
                        margin: 0 !important;"><b>ЖАЛБА КАДА ОРГАН ВЛАСТИ <u>НИЈЕ ПОСТУПИО/ није поступио у целости/ ПО ЗАХТЕВУ</u></b></h4>
                    <h4 style="font-family: 'Times New Roman';
                        font-size: 10pt;
                        text-align: center;
                        margin: 0 !important;"><b>ТРАЖИОЦА У ЗАКОНСКОМ  РОКУ  (ЋУТАЊЕ УПРАВЕ)</b></h4>
                    <p style="font-family: 'Times New Roman';
                        font-size: 11pt;
                        margin-top: 20pt !important;
                        margin-bottom: 0pt !important;"><b>Поверенику за информације од јавног значаја и заштиту података о личности</b></p>
                    <p style="font-family: 'Times New Roman';
                        font-size: 11pt;
                        margin-top: 0pt !important;
                        margin-bottom: 20pt !important;">Адреса за пошту: <xsl:value-of select="/zc:zalba_na_cutanje/zc:adresa_poverenika/common:mesto"></xsl:value-of>, 
                    <xsl:value-of select="/zc:zalba_na_cutanje/zc:adresa_poverenika/common:ulica"></xsl:value-of> бр. <xsl:value-of select="/zc:zalba_na_cutanje/zc:adresa_poverenika/common:broj"></xsl:value-of></p>
                    <p style="font-family: 'Times New Roman';
                        font-size: 11pt;
                        margin-top: 0pt !important;
                        margin-bottom: 20pt !important;">У складу са чланом 22. Закона о слободном приступу информацијама од јавног значаја подносим:</p>
                    <p style="font-family: 'Times New Roman';
                        font-size: 11pt;
                        text-align: center;
                        margin-top: -10pt;"><strong>Ж А Л Б У</strong></p>
                    <p style="margin-top: -10pt;
                        margin-bottom: 0pt;
                        text-align: center;
                        font-size: 11pt;
                        font-family: 'Times New Roman';">против</p>
                    <div style="text-align: center;">
                        <textarea rows="2" style="font-family: 'Times New Roman';
                        width: 60%;
                        margin-top: 10pt;
                        text-align: center;
                        border: none">
                            <xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:naziv"></xsl:value-of>, <xsl:value-of select="concat(/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:mesto"></xsl:value-of>
                        </textarea>
                    </div>
                    <p style="margin-top: 10pt;
                        margin-bottom: 0pt;
                        text-align: center;
                        font-size: 11pt;
                        font-family: 'Times New Roman';">( навести назив органа )</p>
                    <p style="margin-top: 0pt;
                        margin-bottom: 0pt;
                        text-align: center;
                        font-size: 11pt;
                        font-family: 'Times New Roman';">због тога што орган власти:</p>
                    <p style="margin-top: 0pt;
                        margin-bottom: 0pt;
                        text-align: center;
                        font-size: 11pt;
                        font-family: 'Times New Roman';">
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
                    <p style="margin-top: 15pt;
                        margin-bottom: 0pt;
                        text-align: center;
                        font-size: 11pt;
                        font-family: 'Times New Roman';">(подвући  због чега се изјављује жалба)</p>
                    <p style="margin-top: 0pt;
                        margin-bottom: 0pt;
                        text-align: justify;
                        font-size: 11pt;">
                        <span style="font-family: 'Times New Roman';">по мом захтеву за слободан приступ информацијама од јавног значаја који сам поднео том органу дана 
                            <xsl:variable name="datum" select="substring-after(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, '-')"/>
                            <span style="font-family: 'Times New Roman';
                        margin-left: 3pt;
                        display: inline-block;
                        width: 200px"><xsl:value-of select="substring(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, 9, 9)"></xsl:value-of>.<xsl:value-of select="substring-before($datum, '-')"></xsl:value-of>.<xsl:value-of select="substring-before(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, '-')"></xsl:value-of>.</span>
                            године, а којим сам тражио/ла да ми се у складу са Законом о слободном приступу информацијама од јавног значаја омогући увид- копија документа који садржи информације о /у вези са:
                            <textarea rows="3" style="font-family: 'Times New Roman';
                        width: 100%;
                        border: none;
                        font-size: 11pt;">
                                <xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:informacije"></xsl:value-of>
                            </textarea><br></br> 
                        </span>
                    </p>
                    <p style="margin-top: 10pt;
                        margin-bottom: 0pt;
                        text-align: center;
                        font-size: 11pt;
                        font-family: 'Times New Roman';">(навести податке о захтеву и информацији/ама)</p>
                    <p style="margin-top: 0pt !important;
                        margin-bottom: 0pt !important;
                        text-align: justify;
                        font-size: 11pt;
                        text-indent: 30pt !important;">
                        <span style="font-family: 'Times New Roman';">На основу изнетог, предлажем да Повереник уважи моју жалбу и омогући ми приступ траженој/им информацији/ма.</span>
                    </p>
                    <p style="margin-top: 0pt !important;
                        margin-bottom: 0pt !important;
                        text-align: justify;
                        font-size: 11pt;
                        text-indent: 30pt !important;">
                        <span style="font-family: 'Times New Roman';">Као доказ, уз жалбу достављам копију захтева са доказом о предаји органу власти.</span>
                    </p>
                    <p style="margin-top: 0pt !important;
                        margin-bottom: 0pt !important;
                        text-align: justify;
                        font-size: 11pt;
                        text-indent: 30pt !important;
                    ">
                        <span style="font-family: 'Times New Roman';"><b>Напомена:</b> Код жалбе  због непоступању по захтеву у целости, треба приложити и добијени одговор органа власти.</span>
                    </p>
                    <div style="display: block;
                        text-align: right;">
                        <span style="width: 200px;
                        display: inline-block;
                        margin-top: 20pt"><xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:ime"></xsl:value-of></span> <span style="padding-left:4px"><xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:prezime"></xsl:value-of> </span>
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
                        <span style="width: 50%; display: inline-block;"> <xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:ulica"></xsl:value-of> <span style="padding-left:4px"><xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:broj"></xsl:value-of></span>, <xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:mesto"></xsl:value-of> </span>
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
                        <span style="width: 50%; display: inline-block;"><xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:drugi_podaci_za_kontakt"></xsl:value-of> </span>
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
                        <span style="width: 50%; display: inline-block;"> </span>
                    </div>
                    <div style="display: block;
                        text-align: right;
                        width: 100%;">
                        <p style="margin-top: 0pt;
                        font-size: 11pt;
                        font-family: 'Times New Roman';">потпис</p>
                    </div>
                    <p style="text-indent: 10pt;
                        margin-top: -40pt;
                        margin-bottom: 30pt;
                        text-align: justify;
                        font-size: 11pt;
                        font-family: 'Times New Roman';">У
                        <span style="width: 150px;
                        margin-left: 5px;
                        display: inline-block;"> <xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:mesto"></xsl:value-of> </span>, <span padding-left="4px">дана</span>
                        <span style="width: 50%;
                        margin-left: 2px;
                        display: inline-block;">
                        <xsl:variable name="currenttime" select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:datum_podnosenja" as="xs:date" />
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
							select="format-date($currenttime,'[Y]')" />. године </span>
                    </p>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>