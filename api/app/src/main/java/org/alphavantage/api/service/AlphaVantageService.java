package org.alphavantage.api.service;

import org.alphavantage.api.dto.CompaniesDTO;
import org.alphavantage.api.dto.CompanyDTO;
import org.alphavantage.api.dto.DailyPricesDTO;
import org.alphavantage.api.dto.ResponseDTO;

public interface AlphaVantageService {

    ResponseDTO<CompaniesDTO> getCompanies(String keywords);

    ResponseDTO<CompanyDTO> getCompany(String symbol);

    ResponseDTO<DailyPricesDTO> getDaily(String company);

}
