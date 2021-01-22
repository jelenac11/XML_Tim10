export const zahtevXSLT = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:za="http://www.projekat.org/zahtev"
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
                    
                    .c17 {
                        font-family: 'Times New Roman';
                    }
                   
                    .c20 {
                        margin-top: 0pt;
                        margin-bottom: 0pt;
                        text-align: justify;
                        font-size: 11pt;
                    }
                    
                    .c21 {
                        margin-top: 0pt;
                        margin-bottom: 0pt;
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

                    .c34 {
                        font-family: 'Times New Roman';
                        width: 40%;
                        border: none;
                    }

                    .c35 {
                        font-family: 'Times New Roman';
                        font-size: 9pt;
                    }

                    .c36 {
                        font-family: 'Times New Roman';      
                        width: 80%;          
                        border: none
                    }

                    .c37 {
                        font-family: 'Times New Roman';
                        font-size: 11pt;
                        text-align: center;
                        margin-top: -10pt;
                    }
                    .c38 {
                        font-family: 'Times New Roman';
                        font-size: 9pt;
                        margin-top: -10pt;
                    }

                    tab1 { padding-left: 4em; }
                    tab2 { padding-left: 8em; }
                </style>
            </head>
            <body>
            <div class="c1">
                <div class="c7">
                    <textarea rows="1" class="c8">
                        <xsl:value-of select="/za:zahtev_gradjana/za:organ/common:naziv"></xsl:value-of>, <xsl:value-of select="concat(/za:zahtev_gradjana/za:organ/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/za:zahtev_gradjana/za:organ/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/za:zahtev_gradjana/za:organ/common:adresa/common:mesto"></xsl:value-of>
                    </textarea>
                </div>
                <p class="c9">назив и седиште органа коме се захтев упућује</p>
                <br/>
                <br/>
                <br/>
                <p class="c6"><strong>З А Х Т Е В</strong></p>
                <p class="c37"><strong>за приступ информацији од јавног значаја</strong></p>
                <br/>
                <p class="c20"><span class="c17"><tab1>На основу члана 15. ст. 1. Закона о слободном приступу информацијама од јавног значаја („Службени гласник РС“, бр. 120/04, 54/07, 104/09 и 36/10), од горе наведеног органа захтевам:*</tab1></span></p>
                <br/>
                <div>
                <tab1>
                    <xsl:element name="input">
                        <xsl:attribute name="type">checkbox</xsl:attribute>
                        <xsl:attribute name="name">za:obavestenje_posedovanja_informacije</xsl:attribute>
                        <xsl:if test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:obavestenje_posedovanja_informacije">
                            <xsl:attribute name="checked">
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:element>
                    обавештење да ли поседује тражену информацију;
                    </tab1>
                </div>
                <div>
                <tab1>
                    <xsl:element name="input">
                        <xsl:attribute name="type">checkbox</xsl:attribute>
                        <xsl:attribute name="name">uvid_u_dokument</xsl:attribute>
                        <xsl:if test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:uvid_u_dokument">
                            <xsl:attribute name="checked">
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:element>
                    увид у документ који садржи тражену информацију;
                    </tab1>
                </div>
                <div>
                <tab1>
                    <xsl:element name="input">
                        <xsl:attribute name="type">checkbox</xsl:attribute>
                        <xsl:attribute name="name">kopiju_dokumenta</xsl:attribute>
                        <xsl:if test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:kopiju_dokumenta">
                            <xsl:attribute name="checked">
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:element>
                    копију документа који садржи тражену информацију;
                    </tab1>
                </div>
                <div>
                <tab1>
                    <xsl:element name="input">
                        <xsl:attribute name="type">checkbox</xsl:attribute>
                        <xsl:attribute name="name">dostavljanje_kopije</xsl:attribute>
                        <xsl:if test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije">
                            <xsl:attribute name="checked">
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:element>
                    достављање копије документа који садржи тражену информацију:**
                    </tab1>
                </div>
                <div>
                <tab2>
                    <xsl:element name="input">
                        <xsl:attribute name="type">checkbox</xsl:attribute>
                        <xsl:attribute name="name">posta</xsl:attribute>
                        <xsl:attribute name="value">true</xsl:attribute>
                        <xsl:if test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:posta">
                            <xsl:attribute name="checked">
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:element>
                    поштом
                    </tab2>
                </div>
                <div>
                <tab2>
                    <xsl:element name="input">
                        <xsl:attribute name="type">checkbox</xsl:attribute>
                        <xsl:attribute name="name">faks</xsl:attribute>
                        <xsl:attribute name="value">true</xsl:attribute>
                        <xsl:if test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:faks">
                            <xsl:attribute name="checked">
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:element>
                    факсом
                    </tab2>
                </div>
                <div>
                <tab2>
                    <xsl:element name="input">
                        <xsl:attribute name="type">checkbox</xsl:attribute>
                        <xsl:attribute name="name">eposta</xsl:attribute>
                        <xsl:attribute name="value">true</xsl:attribute>
                        <xsl:if test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:eposta">
                            <xsl:attribute name="checked">
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:element>
                    електронском поштом
                    </tab2>
                </div>
                <div>
                <tab2>
                    <xsl:element name="input">
                        <xsl:attribute name="type">checkbox</xsl:attribute>
                        <xsl:attribute name="name">drugi_nacin</xsl:attribute>
                        <xsl:attribute name="value">true</xsl:attribute>
                        <xsl:if test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:drugi_nacin">
                            <xsl:attribute name="checked">
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:element>
                    на други начин:*** 
                    <textarea rows="1" class="c34">
                        <xsl:value-of select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:drugi_nacin"></xsl:value-of>
                    </textarea>
                    </tab2>
                </div>
                <br/>
                <p class="c20"><span class="c17"><tab1>Овај захтев се односи на следеће информације:</tab1></span></p>
                <tab1>
                    <textarea rows="3" class="c36">
                        <xsl:value-of select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:opis_zahteva"></xsl:value-of>
                    </textarea>
                </tab1>
                <br/>
                <tab1><span class="c35">(навести што прецизнији опис информације која се тражи као и друге податке који олакшавају проналажење тражене информације)</span></tab1>                
            
                <div class="c22">
                        <span class="c23"><xsl:value-of select="/za:zahtev_gradjana/za:trazilac/za:lice/common:naziv"></xsl:value-of><xsl:value-of select="concat(/za:zahtev_gradjana/za:trazilac/za:lice/common:ime, ' ')"></xsl:value-of><xsl:value-of select="/za:zahtev_gradjana/za:trazilac/za:lice/common:prezime"></xsl:value-of></span>
                </div>
                    <div class="c22">
                        <p class="c24">Тражилац информације/Име и презиме</p>
                    </div>
                    <div class="c25">
                        <xsl:value-of select="concat(/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:mesto"></xsl:value-of>
                    </div>
                    <div class="c25">
                        <p class="c24">адресa</p>
                    </div>
                    <div class="c25">
                        <span class="c26"><xsl:value-of select="/za:zahtev_gradjana/za:trazilac/za:drugi_podatak_za_kontakt"></xsl:value-of> </span>
                    </div>
                    <div class="c25">
                        <p class="c24">други подаци за контакт</p>
                    </div>
                    <p class="c27">У
                    <span class="c28"><xsl:value-of select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:mesto"></xsl:value-of>,</span>
                    </p>
                    <p class="c29">дана
                    <span class="c30">${("0" + new Date().getDate()).slice(-2) + '.' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '.' + new Date().getFullYear()}. године</span>
                    </p>
                    <p class="c38">__________________________________________</p>
                    <p class="c38">* У кућици означити која законска права на приступ информацијама желите да остварите.</p>
                    <p class="c38">** У кућици означити начин достављања копије докумената.</p>
                    <p class="c38">*** Када захтевате други начин достављања обавезно уписати који начин достављања захтевате.</p>

                </div>
            </body>
        </html>					 
    </xsl:template>
</xsl:stylesheet>
`
