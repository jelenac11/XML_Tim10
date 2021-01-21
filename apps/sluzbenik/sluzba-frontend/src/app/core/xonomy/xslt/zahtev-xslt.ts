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
            width: 75%;
            position: sticky;
            top: 25pt;
            }

            .c6 {
            font-family: "Times New Roman";
            font-size: 14pt;
            text-align: center;
            margin-top:48pt;
            }

            .c8 {
            font-family: "Times New Roman";
            margin-top: 10pt;
            text-align:
            center;
            }

            .c9 {
            text-align: center;
            font-size: 12pt;
            font-family:
            "Times New Roman";
            margin-top:-10pt;
            }

            .c20 {
            font-family:"Times New Roman";
            font-size:12pt;
            text-align:justify;
            text-indent:4em;
            margin-top:28pt;
            }

            .c24 {
            text-align:right;
            font-size: 10pt;
            font-family: "Times New Roman";
            margin-top:-10pt;
            }

            .c25 {
            font-family:"Times New Roman";
            font-size:10pt;
            text-align:right;
            }

            .c27 {
            font-family:"Times New Roman";
            font-size:10pt;
            text-align:left;
            margin-top:-50pt;
            }

            .c29 {
            font-family:"Times New Roman";
            font-size:10pt;
            text-align:left;
            margin-top:20pt;
            }

            .c37 {
            font-family: "Times New Roman";
            font-size: 14pt;
            text-align: center;
            margin-top: -10pt;
            }
            .c38 {
            font-family: "Times New Roman";
            font-size:9pt;
            margin-top: -10pt;
            text-align:justify;
            }

            .c39
            {
            font-family: "Times New Roman";
            font-size: 9pt;
            margin-top: 40pt;
            text-align:justify;
            }

            .c40{
            margin-top:-10pt;
            font-family:"Times New Roman";
            font-size:9pt;
            text-align:justify;
            }

            .c41{
            margin-top:-10pt;
            font-family:"Times New Roman";
            font-size:12pt;
            text-align:justify;
            text-indent:4em;
            }

            .c42{
            font-family:"Times New Roman";
            font-size:12pt;
            text-align:justify;
            text-indent:4em;
            }

            .c43{
            font-family:"Times New Roman";
            font-size:12pt;
            text-indent:4em;
            margin-top:-10pt;
            }

            .c44{
            font-family:"Times New Roman";
            font-size:12pt;
            text-indent:8em;
            margin-top:-10pt;
            }

            .c45{
            font-family:"Times New Roman";
            font-size:12pt;
            text-indent:4em;
            margin-top:12pt;
            }

            .c46{
            font-family:"Times New Roman";
            font-size:10pt;
            text-align:right;
            margin-top:27pt;
            }
        </style>
    </head>
    <body>
        <div class="c1">
            <p class="c8">
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:organ/common:naziv"></xsl:value-of>
                ,
                <xsl:value-of
                    select="concat(/za:zahtev_gradjana/za:organ/common:adresa/common:ulica, ' ')"></xsl:value-of>
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:organ/common:adresa/common:broj"></xsl:value-of>
                ,
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:organ/common:adresa/common:mesto"></xsl:value-of>
            </p>
            <p class="c9">назив и седиште органа коме се захтев упућује</p>
            <p class="c6">
                <strong>З А Х Т Е В</strong>
            </p>
            <p class="c37">
                <strong>за приступ информацији од јавног значаја</strong>
            </p>
            <p class="c20">
                На основу члана 15. ст. 1. Закона о слободном приступу
                информацијама од јавног значаја („Службени гласник РС“, бр.
                120/04, 54/07, 104/09 и 36/10), од горе наведеног органа
                захтевам:*
            </p>
            <p class="c45">
                <xsl:choose>
                    <xsl:when
                        test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:obavestenje_posedovanja_informacije">
                        <span font-size="12pt" font-family="MS Gothic">
                            ☑
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span font-size="12pt" font-family="MS Gothic">
                            ☐
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                обавештење да ли поседује тражену информацију;
            </p>
            <p class="c43">
                <xsl:choose>
                    <xsl:when
                        test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:uvid_u_dokument">
                        <span font-size="12pt" font-family="MS Gothic">
                            ☑
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span font-size="12pt" font-family="MS Gothic">
                            ☐
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                увид у документ који садржи тражену информацију;
            </p>
            <p class="c43">
                <xsl:choose>
                    <xsl:when
                        test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:kopiju_dokumenta">
                        <span font-size="12pt" font-family="MS Gothic">
                            ☑
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span font-size="12pt" font-family="MS Gothic">
                            ☐
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                копију документа који садржи тражену информацију;
            </p>
            <p class="c43">
                <xsl:choose>
                    <xsl:when
                        test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije">
                        <span font-size="12pt" font-family="MS Gothic">
                            ☑
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span font-size="12pt" font-family="MS Gothic">
                            ☐
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                достављање копије документа који садржи тражену информацију:**
            </p>
            <p class="c44">
                <xsl:choose>
                    <xsl:when
                        test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:posta">
                        <span font-size="12pt" font-family="MS Gothic">
                            ☑
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span font-size="12pt" font-family="MS Gothic">
                            ☐
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                поштом
            </p>
            <p class="c44">
                <xsl:choose>
                    <xsl:when
                        test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:faks">
                        <span font-size="12pt" font-family="MS Gothic">
                            ☑
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span font-size="12pt" font-family="MS Gothic">
                            ☐
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                факсом
            </p>
            <p class="c44">
                <xsl:choose>
                    <xsl:when
                        test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:eposta">
                        <span font-size="12pt" font-family="MS Gothic">
                            ☑
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span font-size="12pt" font-family="MS Gothic">
                            ☐
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                електронском поштом
            </p>
            <p class="c44">
                <xsl:choose>
                    <xsl:when
                        test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:drugi_nacin">
                        <span font-size="12pt" font-family="MS Gothic">
                            ☑
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span font-size="12pt" font-family="MS Gothic">
                            ☐
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                на други начин:***
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:drugi_nacin"></xsl:value-of>
            </p>
            <p class="c42">
                Овај захтев се
                односи на следеће информације:
            </p>
            <p class="c41">
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:opis_zahteva"></xsl:value-of>
            </p>
            <p class="c40">(навести што прецизнији опис
                информације која се
                тражи
                као
                и друге податке који олакшавају
                проналажење тражене
                информације)</p>
            <p class="c46">
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:trazilac/za:lice/common:naziv"></xsl:value-of>
                <xsl:value-of
                    select="concat(/za:zahtev_gradjana/za:trazilac/za:lice/common:ime, ' ')"></xsl:value-of>
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:trazilac/za:lice/common:prezime"></xsl:value-of>
            </p>
            <p class="c24">Тражилац информације/Име и презиме</p>
            <p class="c25">
                <xsl:value-of
                    select="concat(/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:ulica, ' ')"></xsl:value-of>
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:broj"></xsl:value-of>
                ,
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:mesto"></xsl:value-of>
            </p>
            <p class="c24">адресa</p>
            <p class="c25">
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:trazilac/za:drugi_podatak_za_kontakt"></xsl:value-of>
            </p>
            <p class="c24">други подаци за контакт</p>
            <p class="c27">
                У
                <xsl:value-of
                    select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:mesto"></xsl:value-of>
                ,

            </p>
            <p class="c29">
                дана
                <xsl:value-of select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:datum" />
                   
                . године
            </p>
            <p class="c39">__________________________________________</p>
            <p class="c38">* У кућици означити која законска права на приступ
                информацијама желите да остварите.</p>
            <p class="c38">** У кућици означити начин достављања копије
                докумената.</p>
            <p class="c38">*** Када захтевате други начин достављања обавезно
                уписати који начин достављања захтевате.</p>
        </div>
    </body>
</html>			 
    </xsl:template>
</xsl:stylesheet>
`
